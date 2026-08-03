"use client";

import Link from "next/link";
import type { CarouselContent, TemplateSlug } from "@/lib/schemas/carousel";
import { TEMPLATE_SLUGS } from "@/lib/schemas/carousel";

type SlidesRailProps = {
  slides: CarouselContent["slides"];
  activeIndex: number;
  onSelect: (index: number) => void;
  onMove: (index: number, delta: -1 | 1) => void;
  onRemove: () => void;
  onAdd: (template: TemplateSlug) => void;
  /** Hide the Galería link (e.g. when shown in drawer chrome) */
  showGalleryLink?: boolean;
  className?: string;
};

export function SlidesRail({
  slides,
  activeIndex,
  onSelect,
  onMove,
  onRemove,
  onAdd,
  showGalleryLink = true,
  className = "",
}: SlidesRailProps) {
  return (
    <div className={`studio-scroll min-h-0 flex-1 overflow-y-auto p-4 ${className}`}>
      {showGalleryLink ? (
        <Link href="/" className="text-sm text-[var(--muted)] hover:text-[var(--accent)]">
          ← Galería
        </Link>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-display)] text-lg ${
          showGalleryLink ? "mt-4" : "mt-0"
        }`}
      >
        Slides
      </h2>
      <ul className="mt-3 space-y-2">
        {slides.map((slide, index) => (
          <li key={`${slide.template}-${index}`}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              className={`flex min-h-11 w-full items-center rounded-xl px-3 py-2 text-left text-sm ${
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
          className="min-h-11 rounded-lg bg-white/10 px-3 py-1.5 text-xs"
          onClick={() => onMove(activeIndex, -1)}
        >
          Subir
        </button>
        <button
          type="button"
          className="min-h-11 rounded-lg bg-white/10 px-3 py-1.5 text-xs"
          onClick={() => onMove(activeIndex, 1)}
        >
          Bajar
        </button>
        <button
          type="button"
          className="min-h-11 rounded-lg bg-white/10 px-3 py-1.5 text-xs"
          onClick={onRemove}
          disabled={slides.length <= 2}
        >
          Quitar
        </button>
      </div>
      <label className="mt-4 block text-xs text-[var(--muted)]">Añadir plantilla</label>
      <select
        className="mt-1 min-h-11 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
        defaultValue=""
        onChange={(e) => {
          const value = e.target.value as TemplateSlug;
          if (!value) return;
          onAdd(value);
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
    </div>
  );
}
