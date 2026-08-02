"use client";

import { brandColorForTone } from "@/lib/domain/item-tone";
import type { BrandColors } from "@/lib/design-tokens";
import {
  ITEM_TONES,
  ITEM_TONE_LABELS,
  type ItemTone,
} from "@/lib/schemas/item-tone";

type Props = {
  value: ItemTone | undefined;
  /** Used to highlight the auto-cycled tone when value is unset. */
  fallbackTone: ItemTone;
  colors: BrandColors;
  onChange: (tone: ItemTone | undefined) => void;
  label?: string;
};

/** Pick a BrandKit semantic tone (or Auto = cycle by index). */
export function ItemTonePicker({
  value,
  fallbackTone,
  colors,
  onChange,
  label = "Tono (skin)",
}: Props) {
  const effective = value ?? fallbackTone;
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs text-[var(--muted)]">{label}</label>
        <button
          type="button"
          className={`rounded px-2 py-0.5 text-[11px] ${
            value === undefined
              ? "bg-white/15 text-white"
              : "text-[var(--muted)] hover:bg-white/10"
          }`}
          onClick={() => onChange(undefined)}
          title="Rotación automática según posición"
        >
          Auto
        </button>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {ITEM_TONES.map((tone) => {
          const selected = effective === tone;
          const locked = value === tone;
          return (
            <button
              key={tone}
              type="button"
              title={ITEM_TONE_LABELS[tone]}
              aria-label={ITEM_TONE_LABELS[tone]}
              aria-pressed={locked}
              onClick={() => onChange(tone)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md border-2 px-1.5 text-[10px] font-medium transition ${
                selected
                  ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/40"
                  : "border-transparent hover:border-white/20"
              }`}
              style={{
                background: brandColorForTone(tone, colors),
                color: tone === "surface" ? colors.ink : colors.bg,
              }}
            >
              {ITEM_TONE_LABELS[tone].slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
