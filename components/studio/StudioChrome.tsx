"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { HamburgerButton } from "@/components/ui/HamburgerButton";
import { LG_QUERY, MD_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

type SlidesRailRender = (ctx: { closeSlides: () => void; inDrawer: boolean }) => ReactNode;

type StudioChromeProps = {
  slideLabel: string;
  slidesRail: SlidesRailRender;
  properties: ReactNode;
  preview: ReactNode;
  actions: ReactNode;
  message?: string | null;
};

/**
 * Responsive studio shell (Composition):
 * - &lt; md: preview + topbar + left/right drawers
 * - md–lg: slides rail + preview + properties drawer
 * - ≥ lg: three columns (legacy desktop)
 */
export function StudioChrome({
  slideLabel,
  slidesRail,
  properties,
  preview,
  actions,
  message,
}: StudioChromeProps) {
  const isMd = useMediaQuery(MD_QUERY);
  const isLg = useMediaQuery(LG_QUERY);
  // SSR / pre-hydrate: assume desktop to avoid mobile flash
  const desktop = isLg === true || (isLg === undefined && isMd === undefined);
  const tablet = isMd === true && isLg === false;

  const layoutMode = desktop ? "lg" : tablet ? "md" : "sm";
  const [slidesOpen, setSlidesOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);
  const [syncedMode, setSyncedMode] = useState(layoutMode);
  const slidesDrawerId = useId();
  const propsDrawerId = useId();

  // Reset drawers when crossing breakpoints (adjust state during render)
  if (syncedMode !== layoutMode) {
    setSyncedMode(layoutMode);
    setSlidesOpen(false);
    setPropsOpen(false);
  }

  const closeSlides = () => setSlidesOpen(false);
  if (desktop) {
    return (
      <div className="box-border h-dvh w-full overflow-hidden p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] md:p-4">
        <div className="grid h-full min-h-0 grid-cols-[240px_minmax(0,1fr)_minmax(280px,360px)] grid-rows-1 gap-4">
          <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)]">
            {slidesRail({ closeSlides, inDrawer: false })}
          </aside>
          <PreviewPane preview={preview} actions={actions} message={message} />
          <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)]">
            <div className="studio-scroll min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
              {properties}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  if (tablet) {
    return (
      <div className="box-border flex h-dvh w-full flex-col overflow-hidden p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] md:p-4">
        <TopBar
          slideLabel={slideLabel}
          showSlidesToggle={false}
          slidesOpen={false}
          propsOpen={propsOpen}
          slidesDrawerId={slidesDrawerId}
          propsDrawerId={propsDrawerId}
          onToggleSlides={() => undefined}
          onToggleProps={() => setPropsOpen((v) => !v)}
        />
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[200px_minmax(0,1fr)] gap-3 md:gap-4">
          <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)]">
            {slidesRail({ closeSlides, inDrawer: false })}
          </aside>
          <PreviewPane preview={preview} actions={actions} message={message} />
        </div>
        <Drawer
          id={propsDrawerId}
          open={propsOpen}
          onClose={() => setPropsOpen(false)}
          side="right"
          title="Propiedades"
          widthClassName="w-[min(100vw-2.5rem,24rem)]"
        >
          <div className="space-y-2 p-4">{properties}</div>
        </Drawer>
      </div>
    );
  }

  // Mobile (&lt; md): preview + drawers
  return (
    <div className="box-border flex h-dvh w-full flex-col overflow-hidden p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))]">
      <TopBar
        slideLabel={slideLabel}
        showSlidesToggle
        slidesOpen={slidesOpen}
        propsOpen={propsOpen}
        slidesDrawerId={slidesDrawerId}
        propsDrawerId={propsDrawerId}
        onToggleSlides={() => setSlidesOpen((v) => !v)}
        onToggleProps={() => setPropsOpen((v) => !v)}
      />
      <div className="mt-3 min-h-0 flex-1">
        <PreviewPane preview={preview} actions={null} message={message} compactActions />
      </div>
      <div className="mt-2 shrink-0 border-t border-[var(--panel-border)] pt-2">
        <div className="studio-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [&_button]:shrink-0 [&_a]:shrink-0">
          {actions}
        </div>
      </div>
      <Drawer
        id={slidesDrawerId}
        open={slidesOpen}
        onClose={closeSlides}
        side="left"
        title="Slides"
        widthClassName="w-[min(100vw-2.5rem,18rem)]"
      >
        <div className="border-b border-[var(--panel-border)] px-4 py-3">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
            onClick={closeSlides}
          >
            ← Galería
          </Link>
        </div>
        {slidesRail({ closeSlides, inDrawer: true })}
      </Drawer>
      <Drawer
        id={propsDrawerId}
        open={propsOpen}
        onClose={() => setPropsOpen(false)}
        side="right"
        title="Propiedades"
        widthClassName="w-[min(100vw-2.5rem,22rem)]"
      >
        <div className="space-y-2 p-4">{properties}</div>
      </Drawer>
    </div>
  );
}

type TopBarProps = {
  slideLabel: string;
  showSlidesToggle: boolean;
  slidesOpen: boolean;
  propsOpen: boolean;
  slidesDrawerId: string;
  propsDrawerId: string;
  onToggleSlides: () => void;
  onToggleProps: () => void;
};

function TopBar({
  slideLabel,
  showSlidesToggle,
  slidesOpen,
  propsOpen,
  slidesDrawerId,
  propsDrawerId,
  onToggleSlides,
  onToggleProps,
}: TopBarProps) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {showSlidesToggle ? (
        <HamburgerButton
          open={slidesOpen}
          onClick={onToggleSlides}
          controls={slidesDrawerId}
          labelOpen="Abrir slides"
          labelClose="Cerrar slides"
        />
      ) : (
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full border border-[var(--panel-border)] px-3 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          ← Galería
        </Link>
      )}
      <p className="min-w-0 flex-1 truncate text-center font-[family-name:var(--font-display)] text-sm md:text-base">
        {slideLabel}
      </p>
      <button
        type="button"
        onClick={onToggleProps}
        aria-expanded={propsOpen}
        aria-controls={propsDrawerId}
        aria-label={propsOpen ? "Cerrar propiedades" : "Abrir propiedades"}
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-[var(--panel-border)] px-3 text-sm text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        Props
      </button>
    </div>
  );
}

function PreviewPane({
  preview,
  actions,
  message,
  compactActions = false,
}: {
  preview: ReactNode;
  actions: ReactNode;
  message?: string | null;
  compactActions?: boolean;
}) {
  return (
    <section className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-black/40">
      {preview}
      {!compactActions && actions ? (
        <div className="shrink-0 space-y-3 border-t border-[var(--panel-border)] p-4">
          {message ? <p className="text-center text-sm text-[var(--accent)]">{message}</p> : null}
          <div className="flex flex-wrap justify-center gap-3">{actions}</div>
        </div>
      ) : message ? (
        <p className="shrink-0 px-3 pb-1 text-center text-xs text-[var(--accent)]">{message}</p>
      ) : null}
    </section>
  );
}
