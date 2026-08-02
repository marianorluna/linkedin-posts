/** Limits and mutations for list-like slide item arrays (Composition). */

export const REPEATABLE_LIMITS = {
  steps: { min: 2, max: 5 },
  "ribbon-steps": { min: 2, max: 10 },
  "icon-rows": { min: 2, max: 5 },
  "icon-bento": { min: 2, max: 10 },
  "vs-split": { min: 2, max: 5 },
  "phone-mock": { min: 1, max: 6 },
} as const;

export type RepeatableTemplate = keyof typeof REPEATABLE_LIMITS;

export function moveItem<T>(items: readonly T[], from: number, delta: number): T[] {
  const to = from + delta;
  if (to < 0 || to >= items.length) return [...items];
  const next = [...items];
  const [item] = next.splice(from, 1);
  if (item === undefined) return next;
  next.splice(to, 0, item);
  return next;
}

export function removeItemAt<T>(items: readonly T[], index: number): T[] {
  return items.filter((_, i) => i !== index);
}

/** Scale typography/spacing so N items still fit in 1080×1080. */
export type ListDensity = {
  gapPx: number;
  titlePx: number;
  detailPx: number;
  badgePx: number;
  iconPx: number;
  padYPx: number;
  mtPx: number;
};

export function listDensity(count: number): ListDensity {
  if (count <= 2) {
    return { gapPx: 40, titlePx: 36, detailPx: 24, badgePx: 72, iconPx: 48, padYPx: 22, mtPx: 48 };
  }
  if (count === 3) {
    return { gapPx: 28, titlePx: 32, detailPx: 22, badgePx: 68, iconPx: 44, padYPx: 18, mtPx: 40 };
  }
  if (count === 4) {
    return { gapPx: 18, titlePx: 28, detailPx: 20, badgePx: 58, iconPx: 38, padYPx: 14, mtPx: 28 };
  }
  if (count === 5) {
    return { gapPx: 12, titlePx: 24, detailPx: 18, badgePx: 48, iconPx: 32, padYPx: 10, mtPx: 20 };
  }
  if (count <= 7) {
    return { gapPx: 8, titlePx: 20, detailPx: 15, badgePx: 40, iconPx: 26, padYPx: 7, mtPx: 14 };
  }
  return { gapPx: 6, titlePx: 17, detailPx: 13, badgePx: 34, iconPx: 22, padYPx: 5, mtPx: 10 };
}

/**
 * icon-bento grid columns.
 * ≥4 → siempre 2 cols (relleno fila a fila: izq→der, luego abajo), como en el brief visual.
 */
export function bentoColumnCount(cellCount: number): number {
  if (cellCount <= 2) return cellCount;
  if (cellCount === 3) return 3;
  return 2;
}
