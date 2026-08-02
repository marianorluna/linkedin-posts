import type { EpisodeVisual } from "@/lib/schemas/episode-visual";
import type { TemplateSlug } from "@/lib/schemas/carousel";
import type { AnySlideVariant } from "@/lib/schemas/variants";

export const NARRATIVE_ARC_IDS = [
  "contrast",
  "number-story",
  "process",
  "map",
  "myth-bust",
  "single-punch",
] as const;

export type NarrativeArcId = (typeof NARRATIVE_ARC_IDS)[number];

export type NarrativeArc = {
  id: NarrativeArcId;
  label: string;
  useWhen: string;
  sequence: readonly TemplateSlug[];
  visual: EpisodeVisual;
  variants: Partial<Record<TemplateSlug, AnySlideVariant>>;
};

export const NARRATIVE_ARCS: Record<NarrativeArcId, NarrativeArc> = {
  contrast: {
    id: "contrast",
    label: "Contraste A/B",
    useWhen: "Comparar antes/después o dos enfoques",
    sequence: ["hook", "vs-split", "ab-compare", "cta"],
    visual: { motif: "bars", accentShift: "brand", contrast: "hard" },
    variants: { hook: "split-icon", cta: "bottom-bar", "vs-split": "columns" },
  },
  "number-story": {
    id: "number-story",
    label: "Historia de un dato",
    useWhen: "Un número ancla el mensaje",
    sequence: ["hook", "stat-hero", "icon-rows", "cta"],
    visual: { motif: "orbs-center", accentShift: "highlight", contrast: "soft" },
    variants: { hook: "type-dominant", "stat-hero": "watermark", cta: "question-big" },
  },
  process: {
    id: "process",
    label: "Proceso",
    useWhen: "Explicar cómo hacerlo paso a paso",
    sequence: ["hook", "ribbon-steps", "steps", "cta"],
    visual: { motif: "ribbons", accentShift: "brand", contrast: "soft" },
    variants: { hook: "centered", "ribbon-steps": "diagonal", cta: "centered" },
  },
  map: {
    id: "map",
    label: "Mapa de ideas",
    useWhen: "Territorio de conceptos o beneficios",
    sequence: ["hook", "icon-bento", "icon-rows", "cta"],
    visual: { motif: "grid", accentShift: "alt", contrast: "soft" },
    variants: { hook: "split-icon", "icon-bento": "hero-cell", cta: "centered" },
  },
  "myth-bust": {
    id: "myth-bust",
    label: "Desmontar mitos",
    useWhen: "Listar creencias falsas y contrastar",
    sequence: ["hook", "icon-rows", "vs-split", "cta"],
    visual: { motif: "diagonal", accentShift: "alt", contrast: "hard" },
    variants: { hook: "type-dominant", "vs-split": "stacked-cards", cta: "question-big" },
  },
  "single-punch": {
    id: "single-punch",
    label: "Golpe corto",
    useWhen: "Carrusel corto de 3 slides",
    sequence: ["hook", "stat-hero", "cta"],
    visual: { motif: "arcs", accentShift: "brand", contrast: "hard", density: "air" },
    variants: { hook: "centered", "stat-hero": "left-rail", cta: "bottom-bar" },
  },
};

export function listNarrativeArcs(): NarrativeArc[] {
  return NARRATIVE_ARC_IDS.map((id) => NARRATIVE_ARCS[id]);
}

export function getNarrativeArc(id: NarrativeArcId): NarrativeArc {
  return NARRATIVE_ARCS[id];
}
