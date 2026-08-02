import { z } from "zod";

/** BrandKit semantic tones for list-item fills (no free hex). */
export const ITEM_TONES = ["accent", "accentAlt", "highlight", "surface"] as const;
export type ItemTone = (typeof ITEM_TONES)[number];

export const itemToneSchema = z.enum(ITEM_TONES);

export const ITEM_TONE_LABELS: Record<ItemTone, string> = {
  accent: "Acento",
  accentAlt: "Alterno",
  highlight: "Highlight",
  surface: "Surface",
};

/** Default rotation when `tone` is omitted (preserves prior look). */
export const ITEM_TONE_CYCLES = {
  ribbon: ["accent", "highlight", "accentAlt", "surface"] as const satisfies readonly ItemTone[],
  rows: ["accent", "surface", "accentAlt", "highlight"] as const satisfies readonly ItemTone[],
  bento: ["accent", "accentAlt", "highlight", "surface"] as const satisfies readonly ItemTone[],
} as const;
