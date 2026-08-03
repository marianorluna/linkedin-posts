"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";
import { LayoutEditProvider } from "@/components/slides/layout/LayoutEditContext";
import { SlideRenderer } from "@/components/slides/SlideRenderer";
import { CollapsibleSection } from "@/components/studio/CollapsibleSection";
import { IconPicker } from "@/components/studio/IconPicker";
import { LayoutOverlay } from "@/components/studio/LayoutOverlay";
import { LayoutPanel } from "@/components/studio/LayoutPanel";
import { EpisodePanel } from "@/components/studio/EpisodePanel";
import {
  AddRepeatableItemButton,
  RepeatableItemShell,
} from "@/components/studio/RepeatableItemsEditor";
import { ItemTonePicker } from "@/components/studio/ItemTonePicker";
import { SlidesRail } from "@/components/studio/SlidesRail";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { StudioProperties } from "@/components/studio/StudioProperties";
import { StylePanel, type BrandKitOption } from "@/components/studio/StylePanel";
import { resolveEpisodeTokens } from "@/lib/domain/episode-visual";
import { rectToSlideCoords, setSlot, slotsForTemplate } from "@/lib/domain/layout";
import { moveItem, removeItemAt, REPEATABLE_LIMITS } from "@/lib/domain/repeatable-items";
import type { BrandTokens } from "@/lib/design-tokens";
import { BRAND_PRESETS, SLIDE_SIZE, deepMergeBrandTokens } from "@/lib/design-tokens";
import type { IconId } from "@/lib/icons/registry";
import type { SlotLayout } from "@/lib/schemas/layout";
import type { CarouselContent, SlideContent, TemplateSlug } from "@/lib/schemas/carousel";
import { ITEM_TONE_CYCLES } from "@/lib/schemas/item-tone";
import { defaultVariant, variantsFor } from "@/lib/schemas/variants";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.25;

function clampZoom(value: number) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(value / ZOOM_STEP) * ZOOM_STEP));
}

/** Fit-to-container scale × user zoom factor (Strategy for preview sizing). */
function usePreviewScale(containerRef: RefObject<HTMLElement | null>) {
  const [fitScale, setFitScale] = useState(0.42);
  const [zoomFactor, setZoomFactor] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const styles = getComputedStyle(el);
      const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const available = Math.min(el.clientWidth - padX, el.clientHeight - padY);
      if (available <= 0) return;
      setFitScale(Math.max(0.15, Math.min(1, available / SLIDE_SIZE)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return {
    scale: fitScale * zoomFactor,
    zoomFactor,
    zoomIn: () => setZoomFactor((z) => clampZoom(z + ZOOM_STEP)),
    zoomOut: () => setZoomFactor((z) => clampZoom(z - ZOOM_STEP)),
    resetZoom: () => setZoomFactor(1),
    canZoomIn: zoomFactor < ZOOM_MAX - 1e-6,
    canZoomOut: zoomFactor > ZOOM_MIN + 1e-6,
  };
}

type Asset = {
  id: string;
  format: string;
  path: string;
  createdAt: string;
};

type StudioEditorProps = {
  mode: "create" | "edit";
  postId?: string;
  versionId?: string | null;
  initialContent: CarouselContent;
  tokens: BrandTokens;
  brandKitId?: string | null;
  status?: string;
  assets?: Asset[];
};

function emptySlide(template: TemplateSlug): SlideContent {
  switch (template) {
    case "hook":
      return {
        template,
        data: { eyebrow: "Nuevo", headline: "Titular corto", subline: "", icon: "lightbulb" },
      };
    case "ab-compare":
      return {
        template,
        data: {
          headline: "Comparativa",
          left: { label: "A", value: 30, caption: "" },
          right: { label: "B", value: 80, caption: "" },
          footer: "",
          icon: "chart-up",
        },
      };
    case "stat-hero":
      return {
        template,
        data: { value: "90%", unit: "", headline: "Resultado", detail: "", icon: "growth" },
      };
    case "steps":
      return {
        template,
        data: {
          headline: "Pasos",
          steps: [
            { title: "Uno", detail: "", icon: "document" },
            { title: "Dos", detail: "", icon: "gears" },
            { title: "Tres", detail: "", icon: "flag" },
          ],
        },
      };
    case "phone-mock":
      return {
        template,
        data: {
          headline: "En el móvil",
          caption: "",
          screenTitle: "App",
          screenLines: ["Línea 1", "Línea 2"],
        },
      };
    case "cta":
      return {
        template,
        data: { headline: "Pregunta final", prompt: "", cta: "Comenta abajo", icon: "network" },
      };
    case "vs-split":
      return {
        template,
        data: {
          headline: "Comparativa",
          leftLabel: "A",
          rightLabel: "B",
          rows: [
            { topic: "Idea", left: "Lado A", right: "Lado B", icon: "lightbulb" },
            { topic: "Proceso", left: "Manual", right: "Sistema", icon: "process" },
            { topic: "Resultado", left: "Lento", right: "Rápido", icon: "growth" },
          ],
        },
      };
    case "ribbon-steps":
      return {
        template,
        data: {
          headline: "Pasos",
          steps: [
            { title: "Paso uno", detail: "Detalle", icon: "document" },
            { title: "Paso dos", detail: "Detalle", icon: "gears" },
            { title: "Paso tres", detail: "Detalle", icon: "flag" },
          ],
        },
      };
    case "icon-rows":
      return {
        template,
        data: {
          headline: "Claves",
          rows: [
            { title: "Fila uno", detail: "Detalle", icon: "target" },
            { title: "Fila dos", detail: "Detalle", icon: "users" },
            { title: "Fila tres", detail: "Detalle", icon: "check" },
          ],
        },
      };
    case "icon-bento":
      return {
        template,
        data: {
          headline: "Mapa",
          subline: "",
          cells: [
            { label: "Celda A", detail: "", icon: "chip" },
            { label: "Celda B", detail: "", icon: "brain" },
            { label: "Celda C", detail: "", icon: "globe" },
            { label: "Celda D", detail: "", icon: "robot" },
          ],
        },
      };
    default: {
      const _exhaustive: never = template;
      return _exhaustive;
    }
  }
}

export function StudioEditor({
  mode,
  postId,
  versionId: initialVersionId,
  initialContent,
  tokens: initialTokens,
  brandKitId: initialBrandKitId = null,
  status = "draft",
  assets = [],
}: StudioEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeIndex, setActiveIndex] = useState(0);
  const [brief, setBrief] = useState(initialContent.topic);
  const [versionId, setVersionId] = useState(initialVersionId ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const [exportAssetId, setExportAssetId] = useState<string | null>(
    assets.find((a) => a.format === "pdf")?.id ?? null,
  );
  const [pending, startTransition] = useTransition();
  const [tokens, setTokens] = useState(initialTokens);
  const [kits, setKits] = useState<BrandKitOption[]>([]);
  const [presets, setPresets] = useState<Array<{ key: string; name: string }>>([]);
  const [selectedKitId, setSelectedKitId] = useState<string | null>(initialBrandKitId);
  const [layoutEditMode, setLayoutEditMode] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotForIndex, setSlotForIndex] = useState(activeIndex);

  const activeSlide = content.slides[activeIndex];
  const episode = resolveEpisodeTokens(tokens, content.visual);
  const previewRef = useRef<HTMLDivElement>(null);
  const slideFrameRef = useRef<HTMLDivElement>(null);
  const { scale, zoomFactor, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut } =
    usePreviewScale(previewRef);

  if (slotForIndex !== activeIndex) {
    setSlotForIndex(activeIndex);
    setSelectedSlot(null);
  }
  function updateActiveLayoutSlot(id: string, patch: SlotLayout) {
    setContent((prev) => {
      const slide = prev.slides[activeIndex];
      if (!slide) return prev;
      const nextSlide = {
        ...slide,
        layout: setSlot(slide.layout, id, patch),
      } as SlideContent;
      return {
        ...prev,
        slides: prev.slides.map((s, i) => (i === activeIndex ? nextSlide : s)),
      };
    });
  }

  const measureSlot = useCallback((id: string) => {
    const root = slideFrameRef.current;
    if (!root) return null;
    const frame = root.querySelector("[data-slide-frame]") as HTMLElement | null;
    const slot = root.querySelector(`[data-slot="${CSS.escape(id)}"]`) as HTMLElement | null;
    if (!frame || !slot) return null;
    return rectToSlideCoords(slot.getBoundingClientRect(), frame.getBoundingClientRect());
  }, []);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/brand-kits");
      if (!res.ok) return;
      const data = (await res.json()) as {
        kits: BrandKitOption[];
        presets: Array<{ key: string; name: string }>;
      };
      setKits(data.kits);
      setPresets(data.presets);
      if (!selectedKitId && data.kits[0]) {
        const preferred =
          data.kits.find((k) => k.name === "Light Infographic") ?? data.kits[0];
        setSelectedKitId(preferred.id);
        if (mode === "create") setTokens(preferred.tokens);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap once
  }, []);

  function updateSlide(index: number, slide: SlideContent) {
    setContent((prev) => ({
      ...prev,
      slides: prev.slides.map((s, i) => (i === index ? slide : s)),
    }));
  }

  function moveSlide(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= content.slides.length) return;
    setContent((prev) => {
      const slides = [...prev.slides];
      const [item] = slides.splice(index, 1);
      slides.splice(target, 0, item);
      return { ...prev, slides };
    });
    setActiveIndex(target);
  }

  async function persistTokens(next: BrandTokens, kitId: string | null = selectedKitId) {
    setTokens(next);
    if (!kitId) return;
    await fetch(`/api/brand-kits/${kitId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens: next }),
    });
  }

  async function selectKit(kitId: string) {
    setSelectedKitId(kitId);
    const kit = kits.find((k) => k.id === kitId);
    if (kit) setTokens(kit.tokens);
    if (mode === "edit" && postId) {
      await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandKitId: kitId }),
      });
    }
  }

  async function applyPreset(presetKey: string) {
    const preset = BRAND_PRESETS[presetKey];
    if (!preset) return;
    const next = deepMergeBrandTokens(preset.tokens);
    setTokens(next);

    if (selectedKitId) {
      const res = await fetch(`/api/brand-kits/${selectedKitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presetKey }),
      });
      if (res.ok) {
        const data = (await res.json()) as { kit: BrandKitOption };
        setKits((prev) => prev.map((k) => (k.id === data.kit.id ? data.kit : k)));
        setMessage(`Preset «${preset.name}» aplicado`);
        return;
      }
    }

    const res = await fetch("/api/brand-kits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ presetKey }),
    });
    if (res.ok) {
      const data = (await res.json()) as { kit: BrandKitOption };
      setKits((prev) => [...prev, data.kit]);
      setSelectedKitId(data.kit.id);
      setTokens(data.kit.tokens);
      setMessage(`Kit «${data.kit.name}» creado`);
    }
  }

  async function generate() {
    setMessage(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brief }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Error al generar");
      return;
    }
    setContent(data.content);
    setActiveIndex(0);
    setMessage(
      data.provider === "demo"
        ? "Demo local (sin API key). Edita y guarda."
        : `Generado con ${data.provider}${data.model ? ` (${data.model})` : ""}`,
    );
  }

  async function save() {
    setMessage(null);
    if (mode === "create" || !postId) {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          status: "draft",
          brandKitId: selectedKitId ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Error al guardar");
        return;
      }
      if (selectedKitId) {
        await fetch(`/api/brand-kits/${selectedKitId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokens }),
        });
      }
      setMessage("Guardado");
      router.push(`/posts/${data.id}`);
      router.refresh();
      return;
    }

    if (selectedKitId) {
      await fetch(`/api/brand-kits/${selectedKitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens }),
      });
    }

    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        status,
        brandKitId: selectedKitId ?? undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Error al guardar");
      return;
    }
    if (data.versionId) setVersionId(data.versionId);
    setMessage("Nueva versión guardada");
    router.refresh();
  }

  async function exportPdf() {
    if (!versionId) {
      setMessage("Guarda una versión antes de crear el PDF");
      return;
    }
    setMessage("Creando PDF… (asegura que el servidor esté en :3000)");
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ versionId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Error al crear el PDF");
      return;
    }
    setExportAssetId(data.assetId);
    setMessage(`PDF listo (${data.pngCount} slides)`);
  }

  const actionButtons = (
    <>
      <button
        type="button"
        onClick={() => {
          setLayoutEditMode((v) => {
            const next = !v;
            if (next && activeSlide) {
              setSelectedSlot(slotsForTemplate(activeSlide.template)[0] ?? null);
            } else {
              setSelectedSlot(null);
            }
            return next;
          });
        }}
        className={`min-h-11 rounded-full px-5 py-2.5 text-sm ${
          layoutEditMode
            ? "bg-[var(--accent)] font-medium text-[#0b1015]"
            : "border border-[var(--panel-border)]"
        }`}
      >
        {layoutEditMode ? "Layout ON" : "Editar layout"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => void save())}
        className="min-h-11 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[#0b1015]"
      >
        Guardar versión
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => void exportPdf())}
        className="min-h-11 rounded-full border border-[var(--panel-border)] px-5 py-2.5 text-sm"
      >
        Crear PDF
      </button>
      {exportAssetId ? (
        <a
          href={`/api/assets/${exportAssetId}`}
          className="inline-flex min-h-11 items-center rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm text-[var(--accent)]"
        >
          Descargar PDF
        </a>
      ) : null}
    </>
  );

  const previewBody = (
    <>
      <div
        className="pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full border border-[var(--panel-border)] bg-[var(--panel)]/95 p-1 shadow-lg backdrop-blur-sm"
        role="group"
        aria-label="Zoom del preview"
      >
        <button
          type="button"
          disabled={!canZoomOut}
          onClick={zoomOut}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full text-sm text-[var(--muted)] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 md:h-8 md:w-8"
          aria-label="Alejar"
          title="Alejar"
        >
          −
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="pointer-events-auto min-h-11 min-w-[3.25rem] rounded-full px-2 py-1 font-[family-name:var(--font-mono)] text-xs tabular-nums text-[var(--accent)] transition hover:bg-white/10 md:min-h-0"
          aria-label="Restablecer zoom al ajuste"
          title="Ajustar al panel"
        >
          {Math.round(zoomFactor * 100)}%
        </button>
        <button
          type="button"
          disabled={!canZoomIn}
          onClick={zoomIn}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full text-sm text-[var(--muted)] transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 md:h-8 md:w-8"
          aria-label="Acercar"
          title="Acercar"
        >
          +
        </button>
      </div>
      <div
        ref={previewRef}
        className="studio-scroll flex min-h-0 flex-1 flex-col items-center overflow-auto p-4"
      >
        <div
          className="relative mx-auto shrink-0 overflow-hidden rounded-xl"
          style={{
            width: SLIDE_SIZE * scale,
            height: SLIDE_SIZE * scale,
          }}
        >
          <LayoutOverlay
            enabled={layoutEditMode}
            onBackgroundClick={() => setSelectedSlot(null)}
          />
          <div
            ref={slideFrameRef}
            style={{
              width: SLIDE_SIZE,
              height: SLIDE_SIZE,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {activeSlide ? (
              <LayoutEditProvider
                value={{
                  editMode: layoutEditMode,
                  selectedSlot,
                  selectSlot: setSelectedSlot,
                  updateSlot: updateActiveLayoutSlot,
                  measureFrame: () => {
                    const frame = slideFrameRef.current?.querySelector(
                      "[data-slide-frame]",
                    ) as HTMLElement | null;
                    return frame?.getBoundingClientRect() ?? null;
                  },
                }}
              >
                <SlideRenderer
                  slide={activeSlide}
                  tokens={episode.tokens}
                  motif={episode.motif}
                  contrast={episode.contrast}
                  legacyMoodDecor={episode.legacyMoodDecor}
                />
              </LayoutEditProvider>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <StudioChrome
      slideLabel={
        activeSlide
          ? `${activeIndex + 1}/${content.slides.length} · ${activeSlide.template}`
          : content.title || "Studio"
      }
      message={message}
      actions={actionButtons}
      preview={previewBody}
      slidesRail={({ closeSlides, inDrawer }) => (
        <SlidesRail
          slides={content.slides}
          activeIndex={activeIndex}
          showGalleryLink={!inDrawer}
          onSelect={(index) => {
            setActiveIndex(index);
            closeSlides();
          }}
          onMove={moveSlide}
          onRemove={() => {
            setContent((prev) => ({
              ...prev,
              slides: prev.slides.filter((_, i) => i !== activeIndex),
            }));
            setActiveIndex((i) => Math.max(0, i - 1));
          }}
          onAdd={(value) => {
            setContent((prev) => ({ ...prev, slides: [...prev.slides, emptySlide(value)] }));
            setActiveIndex(content.slides.length);
          }}
        />
      )}
      properties={
        <StudioProperties>
          <CollapsibleSection title="Contenido" defaultOpen>
            <div>
              <label className="text-xs text-[var(--muted)]">Brief / tema</label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => startTransition(() => void generate())}
                className="mt-2 min-h-11 w-full rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
              >
                Generar con IA
              </button>
            </div>

            <div>
              <label className="text-xs text-[var(--muted)]">Título del post</label>
              <input
                value={content.title}
                onChange={(e) => setContent((c) => ({ ...c, title: e.target.value }))}
                className="mt-1 min-h-11 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--muted)]">Topic</label>
              <input
                value={content.topic}
                onChange={(e) => setContent((c) => ({ ...c, topic: e.target.value }))}
                className="mt-1 min-h-11 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-[var(--muted)]">Tags (coma)</label>
              <input
                value={content.tags.join(", ")}
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  }))
                }
                className="mt-1 min-h-11 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Estilo / BrandKit"
            hint="Los cambios de estilo se guardan en el BrandKit al editar colores o al Guardar."
          >
            <StylePanel
              tokens={tokens}
              kits={kits}
              presets={presets}
              selectedKitId={selectedKitId}
              onTokensChange={(next) => void persistTokens(next)}
              onSelectKit={(id) => void selectKit(id)}
              onApplyPreset={(key) => void applyPreset(key)}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Episodio"
            hint="Motivo y acento de este carrusel; no altera el BrandKit guardado."
          >
            <EpisodePanel
              visual={content.visual}
              onChange={(visual) => setContent((c) => ({ ...c, visual }))}
            />
          </CollapsibleSection>

          {activeSlide && layoutEditMode ? (
            <CollapsibleSection title="Layout del slot">
              <LayoutPanel
                slide={activeSlide}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
                onChange={(slide) => updateSlide(activeIndex, slide)}
                measureSlot={measureSlot}
              />
            </CollapsibleSection>
          ) : null}

          {activeSlide ? (
            <CollapsibleSection title={`Slide: ${activeSlide.template}`}>
              <SlideFields
                slide={activeSlide}
                tokens={tokens}
                onChange={(slide) => updateSlide(activeIndex, slide)}
              />
            </CollapsibleSection>
          ) : null}
        </StudioProperties>
      }
    />
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-[var(--muted)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
      />
    </div>
  );
}

function VariantField({
  slide,
  onChange,
}: {
  slide: SlideContent;
  onChange: (slide: SlideContent) => void;
}) {
  const options = variantsFor(slide.template);
  if (options.length <= 1) return null;
  const value = slide.variant ?? defaultVariant(slide.template);
  return (
    <div>
      <label className="text-xs text-[var(--muted)]">Variante</label>
      <select
        className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
        value={value}
        onChange={(e) =>
          onChange({ ...slide, variant: e.target.value } as SlideContent)
        }
      >
        {options.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}

function SlideFields({
  slide,
  tokens,
  onChange,
}: {
  slide: SlideContent;
  tokens: BrandTokens;
  onChange: (slide: SlideContent) => void;
}) {
  const variantControl = <VariantField slide={slide} onChange={onChange} />;
  const colors = tokens.colors;

  switch (slide.template) {
    case "hook":
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Eyebrow"
            value={slide.data.eyebrow ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, eyebrow: v } })}
          />
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Subline"
            value={slide.data.subline ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, subline: v } })}
          />
          <IconPicker
            value={slide.data.icon}
            onChange={(icon) => onChange({ ...slide, data: { ...slide.data, icon } })}
          />
        </div>
      );
    case "ab-compare":
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Left label"
            value={slide.data.left.label}
            onChange={(v) =>
              onChange({ ...slide, data: { ...slide.data, left: { ...slide.data.left, label: v } } })
            }
          />
          <Field
            label="Left %"
            type="number"
            value={slide.data.left.value}
            onChange={(v) =>
              onChange({
                ...slide,
                data: { ...slide.data, left: { ...slide.data.left, value: Number(v) || 0 } },
              })
            }
          />
          <Field
            label="Right label"
            value={slide.data.right.label}
            onChange={(v) =>
              onChange({
                ...slide,
                data: { ...slide.data, right: { ...slide.data.right, label: v } },
              })
            }
          />
          <Field
            label="Right %"
            type="number"
            value={slide.data.right.value}
            onChange={(v) =>
              onChange({
                ...slide,
                data: { ...slide.data, right: { ...slide.data.right, value: Number(v) || 0 } },
              })
            }
          />
          <Field
            label="Footer"
            value={slide.data.footer ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, footer: v } })}
          />
          <IconPicker
            value={slide.data.icon}
            onChange={(icon) => onChange({ ...slide, data: { ...slide.data, icon } })}
          />
        </div>
      );
    case "stat-hero":
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Valor"
            value={slide.data.value}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, value: v } })}
          />
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Detail"
            value={slide.data.detail ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, detail: v } })}
          />
          <IconPicker
            value={slide.data.icon}
            onChange={(icon) => onChange({ ...slide, data: { ...slide.data, icon } })}
          />
        </div>
      );
    case "steps": {
      const limits = REPEATABLE_LIMITS.steps;
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          {slide.data.steps.map((step, i) => (
            <RepeatableItemShell
              key={i}
              label={`Paso ${i + 1}`}
              index={i}
              total={slide.data.steps.length}
              min={limits.min}
              onMove={(delta) =>
                onChange({
                  ...slide,
                  data: { ...slide.data, steps: moveItem(slide.data.steps, i, delta) },
                })
              }
              onRemove={() =>
                onChange({
                  ...slide,
                  data: { ...slide.data, steps: removeItemAt(slide.data.steps, i) },
                })
              }
            >
              <Field
                label="Título"
                value={step.title}
                onChange={(v) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, title: v } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
              <Field
                label="Detail"
                value={step.detail ?? ""}
                onChange={(v) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, detail: v } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
              <IconPicker
                label="Icono"
                value={step.icon}
                onChange={(icon) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, icon } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
            </RepeatableItemShell>
          ))}
          <AddRepeatableItemButton
            label="Añadir paso"
            count={slide.data.steps.length}
            max={limits.max}
            onAdd={() =>
              onChange({
                ...slide,
                data: {
                  ...slide.data,
                  steps: [
                    ...slide.data.steps,
                    { title: "Nuevo paso", detail: "", icon: "check" as IconId },
                  ],
                },
              })
            }
          />
        </div>
      );
    }
    case "phone-mock":
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Caption"
            value={slide.data.caption ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, caption: v } })}
          />
          <Field
            label="Screen title"
            value={slide.data.screenTitle}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, screenTitle: v } })}
          />
          <Field
            label="Líneas ( | )"
            value={slide.data.screenLines.join(" | ")}
            onChange={(v) =>
              onChange({
                ...slide,
                data: {
                  ...slide.data,
                  screenLines: v
                    .split("|")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .slice(0, REPEATABLE_LIMITS["phone-mock"].max),
                },
              })
            }
          />
        </div>
      );
    case "cta":
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Prompt"
            value={slide.data.prompt ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, prompt: v } })}
          />
          <Field
            label="CTA"
            value={slide.data.cta}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, cta: v } })}
          />
          <IconPicker
            value={slide.data.icon}
            onChange={(icon) => onChange({ ...slide, data: { ...slide.data, icon } })}
          />
        </div>
      );
    case "vs-split": {
      const limits = REPEATABLE_LIMITS["vs-split"];
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Label izq."
            value={slide.data.leftLabel}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, leftLabel: v } })}
          />
          <ItemTonePicker
            label="Tono columna izq."
            value={slide.data.leftTone}
            fallbackTone="accent"
            colors={colors}
            onChange={(leftTone) => onChange({ ...slide, data: { ...slide.data, leftTone } })}
          />
          <Field
            label="Label der."
            value={slide.data.rightLabel}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, rightLabel: v } })}
          />
          <ItemTonePicker
            label="Tono columna der."
            value={slide.data.rightTone}
            fallbackTone="accentAlt"
            colors={colors}
            onChange={(rightTone) => onChange({ ...slide, data: { ...slide.data, rightTone } })}
          />
          {slide.data.rows.map((row, i) => (
            <RepeatableItemShell
              key={i}
              label={`Fila ${i + 1}`}
              index={i}
              total={slide.data.rows.length}
              min={limits.min}
              onMove={(delta) =>
                onChange({
                  ...slide,
                  data: { ...slide.data, rows: moveItem(slide.data.rows, i, delta) },
                })
              }
              onRemove={() =>
                onChange({
                  ...slide,
                  data: { ...slide.data, rows: removeItemAt(slide.data.rows, i) },
                })
              }
            >
              <Field
                label="Topic"
                value={row.topic}
                onChange={(v) => {
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, topic: v } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
              <Field
                label="Izquierda"
                value={row.left}
                onChange={(v) => {
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, left: v } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
              <Field
                label="Derecha"
                value={row.right}
                onChange={(v) => {
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, right: v } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
              <IconPicker
                allowEmpty={false}
                value={row.icon}
                onChange={(icon) => {
                  if (!icon) return;
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, icon } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
            </RepeatableItemShell>
          ))}
          <AddRepeatableItemButton
            label="Añadir fila"
            count={slide.data.rows.length}
            max={limits.max}
            onAdd={() =>
              onChange({
                ...slide,
                data: {
                  ...slide.data,
                  rows: [
                    ...slide.data.rows,
                    { topic: "Tema", left: "Antes", right: "Ahora", icon: "check" as IconId },
                  ],
                },
              })
            }
          />
        </div>
      );
    }
    case "ribbon-steps": {
      const limits = REPEATABLE_LIMITS["ribbon-steps"];
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          {slide.data.steps.map((step, i) => (
            <RepeatableItemShell
              key={i}
              label={`Paso ${i + 1}`}
              index={i}
              total={slide.data.steps.length}
              min={limits.min}
              onMove={(delta) =>
                onChange({
                  ...slide,
                  data: { ...slide.data, steps: moveItem(slide.data.steps, i, delta) },
                })
              }
              onRemove={() =>
                onChange({
                  ...slide,
                  data: { ...slide.data, steps: removeItemAt(slide.data.steps, i) },
                })
              }
            >
              <Field
                label="Título"
                value={step.title}
                onChange={(v) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, title: v } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
              <Field
                label="Detail"
                value={step.detail ?? ""}
                onChange={(v) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, detail: v } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
              <IconPicker
                value={step.icon}
                onChange={(icon) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, icon } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
              <ItemTonePicker
                value={step.tone}
                fallbackTone={ITEM_TONE_CYCLES.ribbon[i % ITEM_TONE_CYCLES.ribbon.length]!}
                colors={colors}
                onChange={(tone) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, tone } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
            </RepeatableItemShell>
          ))}
          <AddRepeatableItemButton
            label="Añadir paso"
            count={slide.data.steps.length}
            max={limits.max}
            onAdd={() =>
              onChange({
                ...slide,
                data: {
                  ...slide.data,
                  steps: [
                    ...slide.data.steps,
                    { title: "Nuevo", detail: "", icon: "flag" as IconId },
                  ],
                },
              })
            }
          />
        </div>
      );
    }
    case "icon-rows": {
      const limits = REPEATABLE_LIMITS["icon-rows"];
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          {slide.data.rows.map((row, i) => (
            <RepeatableItemShell
              key={i}
              label={`Fila ${i + 1}`}
              index={i}
              total={slide.data.rows.length}
              min={limits.min}
              onMove={(delta) =>
                onChange({
                  ...slide,
                  data: { ...slide.data, rows: moveItem(slide.data.rows, i, delta) },
                })
              }
              onRemove={() =>
                onChange({
                  ...slide,
                  data: { ...slide.data, rows: removeItemAt(slide.data.rows, i) },
                })
              }
            >
              <Field
                label="Título"
                value={row.title}
                onChange={(v) => {
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, title: v } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
              <Field
                label="Detail"
                value={row.detail ?? ""}
                onChange={(v) => {
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, detail: v } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
              <IconPicker
                allowEmpty={false}
                value={row.icon}
                onChange={(icon) => {
                  if (!icon) return;
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, icon } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
              <ItemTonePicker
                value={row.tone}
                fallbackTone={ITEM_TONE_CYCLES.rows[i % ITEM_TONE_CYCLES.rows.length]!}
                colors={colors}
                onChange={(tone) => {
                  const rows = slide.data.rows.map((r, idx) =>
                    idx === i ? { ...r, tone } : r,
                  );
                  onChange({ ...slide, data: { ...slide.data, rows } });
                }}
              />
            </RepeatableItemShell>
          ))}
          <AddRepeatableItemButton
            label="Añadir fila"
            count={slide.data.rows.length}
            max={limits.max}
            onAdd={() =>
              onChange({
                ...slide,
                data: {
                  ...slide.data,
                  rows: [
                    ...slide.data.rows,
                    { title: "Nueva", detail: "", icon: "check" as IconId },
                  ],
                },
              })
            }
          />
        </div>
      );
    }
    case "icon-bento": {
      const limits = REPEATABLE_LIMITS["icon-bento"];
      return (
        <div className="space-y-3">
          {variantControl}
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          <Field
            label="Subline"
            value={slide.data.subline ?? ""}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, subline: v } })}
          />
          {slide.data.cells.map((cell, i) => (
            <RepeatableItemShell
              key={i}
              label={`Celda ${i + 1}`}
              index={i}
              total={slide.data.cells.length}
              min={limits.min}
              onMove={(delta) =>
                onChange({
                  ...slide,
                  data: { ...slide.data, cells: moveItem(slide.data.cells, i, delta) },
                })
              }
              onRemove={() =>
                onChange({
                  ...slide,
                  data: { ...slide.data, cells: removeItemAt(slide.data.cells, i) },
                })
              }
            >
              <Field
                label="Label"
                value={cell.label}
                onChange={(v) => {
                  const cells = slide.data.cells.map((c, idx) =>
                    idx === i ? { ...c, label: v } : c,
                  );
                  onChange({ ...slide, data: { ...slide.data, cells } });
                }}
              />
              <Field
                label="Detail"
                value={cell.detail ?? ""}
                onChange={(v) => {
                  const cells = slide.data.cells.map((c, idx) =>
                    idx === i ? { ...c, detail: v } : c,
                  );
                  onChange({ ...slide, data: { ...slide.data, cells } });
                }}
              />
              <IconPicker
                allowEmpty={false}
                value={cell.icon}
                onChange={(icon: IconId | undefined) => {
                  if (!icon) return;
                  const cells = slide.data.cells.map((c, idx) =>
                    idx === i ? { ...c, icon } : c,
                  );
                  onChange({ ...slide, data: { ...slide.data, cells } });
                }}
              />
              <ItemTonePicker
                value={cell.tone}
                fallbackTone={ITEM_TONE_CYCLES.bento[i % ITEM_TONE_CYCLES.bento.length]!}
                colors={colors}
                onChange={(tone) => {
                  const cells = slide.data.cells.map((c, idx) =>
                    idx === i ? { ...c, tone } : c,
                  );
                  onChange({ ...slide, data: { ...slide.data, cells } });
                }}
              />
            </RepeatableItemShell>
          ))}
          <AddRepeatableItemButton
            label="Añadir celda"
            count={slide.data.cells.length}
            max={limits.max}
            onAdd={() =>
              onChange({
                ...slide,
                data: {
                  ...slide.data,
                  cells: [
                    ...slide.data.cells,
                    { label: "Nueva", detail: "", icon: "check" as IconId },
                  ],
                },
              })
            }
          />
        </div>
      );
    }
    default: {
      const _exhaustive: never = slide;
      return _exhaustive;
    }
  }
}
