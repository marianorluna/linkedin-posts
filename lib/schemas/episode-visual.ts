import { z } from "zod";
import { DENSITIES, MOODS } from "@/lib/design-tokens";

/** Decoración de fondo del episodio. `none` = plano (sin figuras). */
export const MOTIFS = [
  "orbs",
  "orbs-tl",
  "orbs-center",
  "arcs",
  "blocks",
  "dots",
  "grid",
  "ribbons",
  "bars",
  "diagonal",
  "none",
] as const;
export type Motif = (typeof MOTIFS)[number];

export const MOTIF_LABELS: Record<Motif, string> = {
  orbs: "Círculos (esquinas TR/BL)",
  "orbs-tl": "Círculos (esquinas TL/BR)",
  "orbs-center": "Círculo central",
  arcs: "Arcos",
  blocks: "Bloques",
  dots: "Puntos",
  grid: "Rejilla",
  ribbons: "Cintas",
  bars: "Barras",
  diagonal: "Diagonal",
  none: "Sin figuras (plano)",
};

export const ACCENT_SHIFTS = ["brand", "alt", "highlight"] as const;
export type AccentShift = (typeof ACCENT_SHIFTS)[number];

export const CONTRASTS = ["soft", "hard"] as const;
export type Contrast = (typeof CONTRASTS)[number];

export const episodeVisualSchema = z
  .object({
    mood: z.enum(MOODS).optional(),
    density: z.enum(DENSITIES).optional(),
    motif: z.enum(MOTIFS).optional(),
    accentShift: z.enum(ACCENT_SHIFTS).optional(),
    contrast: z.enum(CONTRASTS).optional(),
  })
  .strict();

export type EpisodeVisual = z.infer<typeof episodeVisualSchema>;

/** Defaults cuando el carrusel declara `visual` pero omite campos. */
export const DEFAULT_EPISODE_VISUAL: Required<
  Pick<EpisodeVisual, "motif" | "accentShift" | "contrast">
> = {
  motif: "orbs",
  accentShift: "brand",
  contrast: "soft",
};

export function resolveEpisodeVisual(visual?: EpisodeVisual | null): {
  mood: EpisodeVisual["mood"];
  density: EpisodeVisual["density"];
  motif: Motif;
  accentShift: AccentShift;
  contrast: Contrast;
  /** Sin `visual`: el mood del BrandKit dibuja su decoración legacy. */
  legacyMoodDecor: boolean;
} {
  if (!visual) {
    return {
      mood: undefined,
      density: undefined,
      motif: "none",
      accentShift: "brand",
      contrast: "soft",
      legacyMoodDecor: true,
    };
  }
  return {
    mood: visual.mood,
    density: visual.density,
    motif: visual.motif ?? DEFAULT_EPISODE_VISUAL.motif,
    accentShift: visual.accentShift ?? DEFAULT_EPISODE_VISUAL.accentShift,
    contrast: visual.contrast ?? DEFAULT_EPISODE_VISUAL.contrast,
    legacyMoodDecor: false,
  };
}
