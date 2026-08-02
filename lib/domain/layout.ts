import { SLIDE_SIZE } from "@/lib/design-tokens";
import type { SlotLayout } from "@/lib/schemas/layout";
import { ICON_SLOTS, TEMPLATE_SLOTS, TEXT_SLOTS } from "@/lib/schemas/layout";
import type { SlideContent, TemplateSlug } from "@/lib/schemas/carousel";

export function clampCoord(value: number): number {
  return Math.min(SLIDE_SIZE, Math.max(0, Math.round(value)));
}

export function clampSize(value: number): number {
  return Math.min(SLIDE_SIZE, Math.max(24, Math.round(value)));
}

export function normalizeSlot(partial: SlotLayout): SlotLayout {
  const next: SlotLayout = {};
  if (partial.x !== undefined) next.x = clampCoord(partial.x);
  if (partial.y !== undefined) next.y = clampCoord(partial.y);
  if (partial.w !== undefined) next.w = clampSize(partial.w);
  if (partial.h !== undefined) next.h = clampSize(partial.h);
  if (partial.fontSize !== undefined) {
    next.fontSize = Math.min(200, Math.max(12, Math.round(partial.fontSize)));
  }
  if (partial.bold !== undefined) next.bold = partial.bold;
  if (partial.italic !== undefined) next.italic = partial.italic;
  return next;
}

export function getSlot(
  layout: SlideContent["layout"] | undefined,
  id: string,
): SlotLayout | undefined {
  if (!layout) return undefined;
  return (layout as Record<string, SlotLayout | undefined>)[id];
}

export function setSlot(
  layout: SlideContent["layout"] | undefined,
  id: string,
  patch: SlotLayout,
): NonNullable<SlideContent["layout"]> {
  const current = getSlot(layout, id) ?? {};
  const merged = normalizeSlot({ ...current, ...patch });
  return {
    ...(layout ?? {}),
    [id]: merged,
  } as NonNullable<SlideContent["layout"]>;
}

/** Replaces the slot entirely (allows removing individual keys). */
export function replaceSlot(
  layout: SlideContent["layout"] | undefined,
  id: string,
  slot: SlotLayout | undefined,
): SlideContent["layout"] {
  if (!slot || Object.keys(slot).length === 0) return clearSlot(layout, id);
  return {
    ...(layout ?? {}),
    [id]: normalizeSlot(slot),
  } as NonNullable<SlideContent["layout"]>;
}

export function clearSlot(
  layout: SlideContent["layout"] | undefined,
  id: string,
): SlideContent["layout"] {
  if (!layout) return undefined;
  const next = { ...(layout as Record<string, SlotLayout>) };
  delete next[id];
  return Object.keys(next).length ? (next as NonNullable<SlideContent["layout"]>) : undefined;
}

export function clearLayout(): undefined {
  return undefined;
}

export function slotsForTemplate(template: TemplateSlug): readonly string[] {
  return TEMPLATE_SLOTS[template];
}

export function isTextSlot(id: string): boolean {
  return TEXT_SLOTS.has(id);
}

export function isIconSlot(id: string): boolean {
  return ICON_SLOTS.has(id);
}

export function hasPosition(layout?: SlotLayout): boolean {
  return layout?.x !== undefined || layout?.y !== undefined;
}
