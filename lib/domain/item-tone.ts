import {
  ITEM_TONES,
  type ItemTone,
} from "@/lib/schemas/item-tone";

const TONE_CSS: Record<ItemTone, string> = {
  accent: "var(--slide-accent)",
  accentAlt: "var(--slide-accent-alt)",
  highlight: "var(--slide-highlight)",
  surface: "var(--slide-surface)",
};

export type ResolvedItemTone = {
  tone: ItemTone;
  cssVar: string;
  /** Text/icon color over the fill: bg (= light on accent) or ink (= dark on surface). */
  inkOnTone: "bg" | "ink";
};

export function resolveItemTone(
  tone: ItemTone | undefined,
  index: number,
  cycle: readonly ItemTone[] = ITEM_TONES,
): ResolvedItemTone {
  const resolved = tone ?? cycle[index % cycle.length] ?? "accent";
  return {
    tone: resolved,
    cssVar: TONE_CSS[resolved],
    inkOnTone: resolved === "surface" ? "ink" : "bg",
  };
}

export function brandColorForTone(
  tone: ItemTone,
  colors: {
    accent: string;
    accentAlt: string;
    highlight: string;
    surface: string;
  },
): string {
  switch (tone) {
    case "accent":
      return colors.accent;
    case "accentAlt":
      return colors.accentAlt;
    case "highlight":
      return colors.highlight;
    case "surface":
      return colors.surface;
  }
}
