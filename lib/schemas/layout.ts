import { z } from "zod";

const coord = z.number().min(0).max(1080);
const size = z.number().min(24).max(1080);

export const slotLayoutSchema = z
  .object({
    x: coord.optional(),
    y: coord.optional(),
    w: size.optional(),
    h: size.optional(),
    fontSize: z.number().min(12).max(200).optional(),
    bold: z.boolean().optional(),
    italic: z.boolean().optional(),
  })
  .strict();

export type SlotLayout = z.infer<typeof slotLayoutSchema>;

export const TEMPLATE_SLOTS = {
  hook: ["eyebrow", "headline", "subline", "icon"],
  "ab-compare": ["headline", "bars", "footer", "icon"],
  "stat-hero": ["eyebrow", "value", "headline", "detail", "icon"],
  steps: ["headline", "list"],
  "phone-mock": ["headline", "caption", "phone"],
  cta: ["eyebrow", "headline", "prompt", "cta", "icon"],
  "vs-split": ["headline", "panel", "leftLabel", "rightLabel"],
  "ribbon-steps": ["headline", "steps"],
  "icon-rows": ["headline", "rows"],
  "icon-bento": ["headline", "subline", "grid"],
} as const;

export type TemplateSlotsMap = typeof TEMPLATE_SLOTS;
export type SlotIdForTemplate<T extends keyof TemplateSlotsMap> = TemplateSlotsMap[T][number];

export const TEXT_SLOTS = new Set([
  "eyebrow",
  "headline",
  "subline",
  "prompt",
  "cta",
  "caption",
  "detail",
  "footer",
  "value",
  "leftLabel",
  "rightLabel",
]);

/** Slots donde `bold` controla el stroke del SVG (no tipografía). */
export const ICON_SLOTS = new Set(["icon"]);

export function layoutSchemaForSlots(slots: readonly string[]) {
  const shape: Record<string, typeof slotLayoutSchema> = {};
  for (const slot of slots) {
    shape[slot] = slotLayoutSchema;
  }
  return z.object(shape).partial().optional();
}
