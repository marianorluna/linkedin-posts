"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlideRenderer } from "@/components/slides/SlideRenderer";
import type { BrandTokens } from "@/lib/design-tokens";
import { SLIDE_SIZE } from "@/lib/design-tokens";
import type { CarouselContent, SlideContent, TemplateSlug } from "@/lib/schemas/carousel";
import { TEMPLATE_SLUGS } from "@/lib/schemas/carousel";

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
  status?: string;
  assets?: Asset[];
};

function emptySlide(template: TemplateSlug): SlideContent {
  switch (template) {
    case "hook":
      return { template, data: { eyebrow: "Nuevo", headline: "Titular corto", subline: "" } };
    case "ab-compare":
      return {
        template,
        data: {
          headline: "Comparativa",
          left: { label: "A", value: 30, caption: "" },
          right: { label: "B", value: 80, caption: "" },
          footer: "",
        },
      };
    case "stat-hero":
      return { template, data: { value: "90%", unit: "", headline: "Resultado", detail: "" } };
    case "steps":
      return {
        template,
        data: {
          headline: "Pasos",
          steps: [
            { title: "Uno", detail: "" },
            { title: "Dos", detail: "" },
            { title: "Tres", detail: "" },
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
      return { template, data: { headline: "Pregunta final", prompt: "", cta: "Comenta abajo" } };
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
  tokens,
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

  const activeSlide = content.slides[activeIndex];
  const scale = useMemo(() => 0.42, []);

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
        body: JSON.stringify({ content, status: "draft" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? "Error al guardar");
        return;
      }
      setMessage("Guardado");
      router.push(`/posts/${data.id}`);
      router.refresh();
      return;
    }

    const res = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, status }),
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
      setMessage("Guarda una versión antes de exportar");
      return;
    }
    setMessage("Exportando PDF… (asegura que el servidor esté en :3000)");
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ versionId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Error de export");
      return;
    }
    setExportAssetId(data.assetId);
    setMessage(`PDF listo (${data.pngCount} slides)`);
  }

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1400px] gap-6 px-4 py-6 lg:grid-cols-[240px_1fr_320px]">
      <aside className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-4">
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">
          ← Galería
        </Link>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-lg">Slides</h2>
        <ul className="mt-3 space-y-2">
          {content.slides.map((slide, index) => (
            <li key={`${slide.template}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm ${
                  index === activeIndex
                    ? "bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] text-[var(--accent)]"
                    : "bg-white/5 text-[var(--muted)] hover:bg-white/10"
                }`}
              >
                {index + 1}. {slide.template}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs"
            onClick={() => moveSlide(activeIndex, -1)}
          >
            Subir
          </button>
          <button
            type="button"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs"
            onClick={() => moveSlide(activeIndex, 1)}
          >
            Bajar
          </button>
          <button
            type="button"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs"
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                slides: prev.slides.filter((_, i) => i !== activeIndex),
              }));
              setActiveIndex((i) => Math.max(0, i - 1));
            }}
            disabled={content.slides.length <= 2}
          >
            Quitar
          </button>
        </div>
        <label className="mt-4 block text-xs text-[var(--muted)]">Añadir plantilla</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          defaultValue=""
          onChange={(e) => {
            const value = e.target.value as TemplateSlug;
            if (!value) return;
            setContent((prev) => ({ ...prev, slides: [...prev.slides, emptySlide(value)] }));
            setActiveIndex(content.slides.length);
            e.target.value = "";
          }}
        >
          <option value="">Elegir…</option>
          {TEMPLATE_SLUGS.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>
      </aside>

      <section className="flex flex-col items-center gap-4">
        <div className="w-full rounded-2xl border border-[var(--panel-border)] bg-black/40 p-4">
          <div
            className="mx-auto overflow-hidden rounded-xl"
            style={{
              width: SLIDE_SIZE * scale,
              height: SLIDE_SIZE * scale,
            }}
          >
            <div
              style={{
                width: SLIDE_SIZE,
                height: SLIDE_SIZE,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {activeSlide ? <SlideRenderer slide={activeSlide} tokens={tokens} /> : null}
            </div>
          </div>
        </div>
        {message ? <p className="text-sm text-[var(--accent)]">{message}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(() => void save())}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[#0b1015]"
          >
            Guardar versión
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(() => void exportPdf())}
            className="rounded-full border border-[var(--panel-border)] px-5 py-2.5 text-sm"
          >
            Exportar PDF
          </button>
          {exportAssetId ? (
            <a
              href={`/api/assets/${exportAssetId}`}
              className="rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm text-[var(--accent)]"
            >
              Descargar PDF
            </a>
          ) : null}
        </div>
      </section>

      <aside className="space-y-4 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-4">
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
            className="mt-2 w-full rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          >
            Generar con IA
          </button>
        </div>

        <div>
          <label className="text-xs text-[var(--muted)]">Título del post</label>
          <input
            value={content.title}
            onChange={(e) => setContent((c) => ({ ...c, title: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--muted)]">Topic</label>
          <input
            value={content.topic}
            onChange={(e) => setContent((c) => ({ ...c, topic: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
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
            className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-3 py-2 text-sm"
          />
        </div>

        {activeSlide ? (
          <SlideFields
            slide={activeSlide}
            onChange={(slide) => updateSlide(activeIndex, slide)}
          />
        ) : null}
      </aside>
    </div>
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

function SlideFields({
  slide,
  onChange,
}: {
  slide: SlideContent;
  onChange: (slide: SlideContent) => void;
}) {
  switch (slide.template) {
    case "hook":
      return (
        <div className="space-y-3 border-t border-[var(--panel-border)] pt-4">
          <p className="text-sm font-medium">Slide hook</p>
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
        </div>
      );
    case "ab-compare":
      return (
        <div className="space-y-3 border-t border-[var(--panel-border)] pt-4">
          <p className="text-sm font-medium">Slide A/B</p>
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
        </div>
      );
    case "stat-hero":
      return (
        <div className="space-y-3 border-t border-[var(--panel-border)] pt-4">
          <p className="text-sm font-medium">Slide stat</p>
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
        </div>
      );
    case "steps":
      return (
        <div className="space-y-3 border-t border-[var(--panel-border)] pt-4">
          <p className="text-sm font-medium">Slide steps</p>
          <Field
            label="Headline"
            value={slide.data.headline}
            onChange={(v) => onChange({ ...slide, data: { ...slide.data, headline: v } })}
          />
          {slide.data.steps.map((step, i) => (
            <div key={i} className="space-y-2 rounded-lg bg-white/5 p-2">
              <Field
                label={`Paso ${i + 1} título`}
                value={step.title}
                onChange={(v) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, title: v } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
              <Field
                label={`Paso ${i + 1} detail`}
                value={step.detail ?? ""}
                onChange={(v) => {
                  const steps = slide.data.steps.map((s, idx) =>
                    idx === i ? { ...s, detail: v } : s,
                  );
                  onChange({ ...slide, data: { ...slide.data, steps } });
                }}
              />
            </div>
          ))}
        </div>
      );
    case "phone-mock":
      return (
        <div className="space-y-3 border-t border-[var(--panel-border)] pt-4">
          <p className="text-sm font-medium">Slide phone</p>
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
                    .filter(Boolean),
                },
              })
            }
          />
        </div>
      );
    case "cta":
      return (
        <div className="space-y-3 border-t border-[var(--panel-border)] pt-4">
          <p className="text-sm font-medium">Slide CTA</p>
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
        </div>
      );
    default: {
      const _exhaustive: never = slide;
      return _exhaustive;
    }
  }
}
