import type { BrandColors, BrandTokens } from "@/lib/design-tokens";
import {
  resolveEpisodeVisual,
  type EpisodeVisual,
  type Motif,
  type Contrast,
} from "@/lib/schemas/episode-visual";

export type ResolvedEpisode = {
  tokens: BrandTokens;
  motif: Motif;
  contrast: Contrast;
  /** true si no hay carousel.visual → decoración del mood BrandKit. */
  legacyMoodDecor: boolean;
};

function softAccent(hex: string, alpha: number): string {
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return `color-mix(in srgb, ${hex} ${Math.round(alpha * 100)}%, transparent)`;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function applyAccentShift(colors: BrandColors, shift: EpisodeVisual["accentShift"]): BrandColors {
  if (!shift || shift === "brand") return colors;

  if (shift === "alt") {
    return {
      ...colors,
      accent: colors.accentAlt,
      accentSoft: softAccent(colors.accentAlt, 0.18),
      accentAlt: colors.accent,
    };
  }

  return {
    ...colors,
    accent: colors.highlight,
    accentSoft: softAccent(colors.highlight, 0.18),
  };
}

/** Combina BrandKit + EpisodeVisual sin mutar el kit persistido. */
export function resolveEpisodeTokens(
  brand: BrandTokens,
  visual?: EpisodeVisual | null,
): ResolvedEpisode {
  const resolved = resolveEpisodeVisual(visual);
  const colors = applyAccentShift(brand.colors, resolved.accentShift);

  const tokens: BrandTokens = {
    ...brand,
    colors,
    mood: resolved.mood ?? brand.mood,
    density: resolved.density ?? brand.density,
  };

  return {
    tokens,
    motif: resolved.motif,
    contrast: resolved.contrast,
    legacyMoodDecor: resolved.legacyMoodDecor,
  };
}
