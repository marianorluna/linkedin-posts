import type { CarouselContent } from "@/lib/schemas/carousel";
import { sampleCarousel, sampleProcessCarousel } from "@/lib/schemas/carousel";

/** Kit seed: 10 carruseles listos para duplicar. */
export type SeedCarouselEntry = {
  content: CarouselContent;
  arc: string;
  brandPresetKey: string;
};

export const seedCarouselOpenCode: CarouselContent = {
  title: "Open Code vs Claude Code",
  topic: "Comparativa open source multi-LLM vs Claude Code",
  tags: ["opencode", "claudecode", "opensource", "llm"],
  visual: { motif: "grid", accentShift: "alt", contrast: "hard" },
  slides: [
    {
      template: "hook",
      variant: "type-dominant",
      data: {
        eyebrow: "Dev tools",
        headline: "¿Open Code o Claude Code?",
        subline: "Misma idea. Distinto control.",
        icon: "code",
      },
    },
    {
      template: "vs-split",
      variant: "stacked-cards",
      data: {
        headline: "Dónde diverge",
        leftLabel: "Open Code",
        rightLabel: "Claude Code",
        rows: [
          { topic: "Modelo", left: "Elige el LLM", right: "Claude fijo", icon: "spark" },
          { topic: "Licencia", left: "Open source", right: "Producto cerrado", icon: "document" },
          { topic: "Control", left: "Self-host posible", right: "Cloud Anthropic", icon: "terminal" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Qué mirar antes de elegir",
        rows: [
          { title: "Vendor lock", detail: "¿Puedes cambiar de modelo?", icon: "gears" },
          { title: "Equipo", detail: "Quién paga y quién opera", icon: "users" },
          { title: "Contexto", detail: "Repos, repo, políticas", icon: "layers" },
        ],
      },
    },
    {
      template: "cta",
      variant: "question-big",
      data: {
        headline: "¿Con qué stack programas tú?",
        prompt: "Comenta OPEN o CLAUDE",
        cta: "Guarda la comparativa",
        icon: "code",
      },
    },
  ],
};

export const seedCarouselNumberStory: CarouselContent = {
  title: "Un número que abre el feed",
  topic: "Cómo un dato grande frena el scroll en LinkedIn",
  tags: ["linkedin", "dato", "stat"],
  visual: { motif: "orbs-tl", accentShift: "brand", contrast: "hard" },
  slides: [
    {
      template: "hook",
      variant: "split-icon",
      data: {
        eyebrow: "Hook numérico",
        headline: "Un número bien puesto vale más que un párrafo",
        subline: "El feed premia la legibilidad.",
        icon: "chart-up",
      },
    },
    {
      template: "stat-hero",
      variant: "watermark",
      data: {
        value: "3s",
        unit: "",
        headline: "Para decidir si siguen",
        detail: "Si no se lee en un vistazo, se va.",
        icon: "target",
      },
    },
    {
      template: "stat-hero",
      variant: "left-rail",
      data: {
        value: "1",
        unit: "idea",
        headline: "Por diapositiva",
        detail: "Menos copy. Más señal.",
        icon: "lightbulb",
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Antes vs después del dato",
        left: { label: "Párrafo", value: 22, caption: "Scroll past" },
        right: { label: "Stat hero", value: 78, caption: "Stop" },
        footer: "Misma audiencia. Distinto layout.",
        icon: "growth",
      },
    },
    {
      template: "cta",
      variant: "bottom-bar",
      data: {
        headline: "¿Cuál es tu número de esta semana?",
        prompt: "Déjalo en comentarios",
        cta: "Guarda el formato",
        icon: "chart-up",
      },
    },
  ],
};

export const seedCarouselMapStack: CarouselContent = {
  title: "Mapa del stack en 4 celdas",
  topic: "Visión rápida de capas tech en un estudio",
  tags: ["stack", "tech", "mapa"],
  visual: { motif: "blocks", accentShift: "highlight", contrast: "soft" },
  slides: [
    {
      template: "hook",
      variant: "centered",
      data: {
        eyebrow: "Mapa",
        headline: "Tu stack en una slide",
        subline: "Cuatro celdas. Cero ruido.",
        icon: "layers",
      },
    },
    {
      template: "icon-bento",
      variant: "hero-cell",
      data: {
        headline: "Capas que importan",
        subline: "De la idea al entregable.",
        cells: [
          { label: "Datos", detail: "Fuente única", icon: "chip", tone: "accent" },
          { label: "Modelo", detail: "BIM / código", icon: "building" },
          { label: "Automatizar", detail: "Scripts + IA", icon: "spark" },
          { label: "Publicar", detail: "PDF / web", icon: "globe" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Reglas del mapa",
        rows: [
          { title: "Una celda = un rol", detail: "No mezcles capas", icon: "target" },
          { title: "Icono del catálogo", detail: "Sin emojis", icon: "check" },
          { title: "Detalle corto", detail: "Máximo una línea", icon: "document" },
        ],
      },
    },
    {
      template: "cta",
      variant: "centered",
      data: {
        headline: "¿Qué celda te falta en el estudio?",
        prompt: "Comenta STACK",
        cta: "Duplica y reescribe",
        icon: "layers",
      },
    },
  ],
};

export const seedCarouselMythIa: CarouselContent = {
  title: "Mitos de la IA en el estudio",
  topic: "Tres creencias que frenan adopción real",
  tags: ["ia", "mitos", "estudio"],
  visual: { motif: "dots", accentShift: "alt", contrast: "soft" },
  slides: [
    {
      template: "hook",
      variant: "split-icon",
      data: {
        eyebrow: "Myth-bust",
        headline: "La IA no sustituye al criterio",
        subline: "Sustituye el trabajo repetible.",
        icon: "brain",
      },
    },
    {
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Mito vs realidad",
        leftLabel: "Mito",
        rightLabel: "Hecho",
        rows: [
          { topic: "Rol", left: "Reemplaza al equipo", right: "Amplifica al equipo", icon: "users" },
          { topic: "Calidad", left: "Sale perfecto", right: "Hay que revisar", icon: "search" },
          { topic: "Coste", left: "Gratis mágico", right: "Tiempo + tokens", icon: "coin" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Qué sí funciona ya",
        rows: [
          { title: "Borradores", detail: "Primera pasada rápida", icon: "spark" },
          { title: "Checklists", detail: "No olvidar pasos", icon: "check" },
          { title: "Variantes", detail: "Probar ángulos", icon: "process" },
        ],
      },
    },
    {
      template: "cta",
      variant: "centered",
      data: {
        headline: "¿Qué mito escuchas más en tu oficina?",
        prompt: "Cuéntalo abajo",
        cta: "Comparte el post",
        icon: "robot",
      },
    },
  ],
};

export const seedCarouselSinglePunch: CarouselContent = {
  title: "Un solo golpe: el dato",
  topic: "Carrusel corto de 3 slides con un número dominante",
  tags: ["dato", "corto", "impacto"],
  visual: { motif: "none", accentShift: "brand", contrast: "hard" },
  slides: [
    {
      template: "hook",
      variant: "centered",
      data: {
        eyebrow: "Single punch",
        headline: "Menos slides. Más golpe.",
        subline: "Tres pantallas bastan.",
        icon: "target",
      },
    },
    {
      template: "stat-hero",
      variant: "stack",
      data: {
        value: "70%",
        unit: "",
        headline: "Del valor está en el hook",
        detail: "El resto sostiene o cierra.",
        icon: "growth",
      },
    },
    {
      template: "cta",
      variant: "bottom-bar",
      data: {
        headline: "¿Cuál es tu métrica estrella?",
        prompt: "Escríbela en un comentario",
        cta: "Guarda el formato",
        icon: "flag",
      },
    },
  ],
};

export const seedCarouselMobileVista: CarouselContent = {
  title: "Se ve nítido en móvil",
  topic: "Diseño de carrusel pensado para scroll en el teléfono",
  tags: ["movil", "ux", "linkedin"],
  visual: { motif: "grid", accentShift: "brand", contrast: "soft" },
  slides: [
    {
      template: "hook",
      variant: "split-icon",
      data: {
        eyebrow: "Mobile first",
        headline: "Se ve nítido en móvil",
        subline: "Una idea por diapositiva. Poco texto.",
        icon: "globe",
      },
    },
    {
      template: "phone-mock",
      variant: "default",
      data: {
        headline: "Preview del feed",
        caption: "El pulgar decide en segundos.",
        screenTitle: "Preview",
        screenLines: ["Hook claro", "Dato visual", "CTA al final"],
      },
    },
    {
      template: "phone-mock",
      variant: "laptop",
      data: {
        headline: "También en desktop",
        caption: "Misma idea, otra silueta.",
        screenTitle: "Studio",
        screenLines: ["Editar JSON", "Cambiar variant", "Export PDF"],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Checklist móvil",
        steps: [
          { title: "Titular corto", detail: "Legible a 1 m", icon: "check" },
          { title: "Contraste", detail: "Ink vs fondo", icon: "target" },
          { title: "CTA visible", detail: "Última slide", icon: "flag" },
        ],
      },
    },
    {
      template: "cta",
      variant: "question-big",
      data: {
        headline: "¿Revisas el PDF en el teléfono?",
        prompt: "Comenta SÍ o NO",
        cta: "Duplica esta base",
        icon: "globe",
      },
    },
  ],
};

export const seedCarouselBim: CarouselContent = {
  title: "BIM: del plano al modelo",
  topic: "Proceso corto de información en proyectos AEC",
  tags: ["bim", "aec", "proceso"],
  visual: { motif: "diagonal", accentShift: "highlight", contrast: "soft" },
  slides: [
    {
      template: "hook",
      variant: "type-dominant",
      data: {
        eyebrow: "AEC",
        headline: "Del plano al modelo sin perder el hilo",
        subline: "Información que viaja con el edificio.",
        icon: "building",
      },
    },
    {
      template: "ribbon-steps",
      variant: "numbered-rail",
      data: {
        headline: "Cadena BIM",
        steps: [
          { title: "Captura", detail: "Requisitos claros", icon: "document", tone: "accent" },
          { title: "Modelo", detail: "Niveles y capas", icon: "layers", tone: "accentAlt" },
          { title: "Coordina", detail: "Clash / issues", icon: "network", tone: "highlight" },
          { title: "Entrega", detail: "Datos útiles", icon: "flag", tone: "surface" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "grid",
      data: {
        headline: "Qué no puede faltar",
        subline: "Cuatro piezas mínimas.",
        cells: [
          { label: "LOD", detail: "Nivel acordado", icon: "layers" },
          { label: "IFC", detail: "Intercambio", icon: "process" },
          { label: "CDE", detail: "Fuente única", icon: "cloud" },
          { label: "QA", detail: "Revisión", icon: "search" },
        ],
      },
    },
    {
      template: "cta",
      variant: "bottom-bar",
      data: {
        headline: "¿En qué eslabón se rompe tu flujo?",
        prompt: "Comenta BIM",
        cta: "Guarda el proceso",
        icon: "building",
      },
    },
  ],
};

export const seedCarouselIssuePr: CarouselContent = {
  title: "De issue a PR con IA",
  topic: "Flujo de desarrollo asistido: issue → código → revisión",
  tags: ["ia", "code", "pr", "dev"],
  visual: { motif: "arcs", accentShift: "alt", contrast: "hard" },
  slides: [
    {
      template: "hook",
      variant: "split-icon",
      data: {
        eyebrow: "Dev + IA",
        headline: "De issue a PR sin perder contexto",
        subline: "La IA redacta. Tú decides.",
        icon: "spark",
      },
    },
    {
      template: "phone-mock",
      variant: "browser",
      data: {
        headline: "El hilo en el editor",
        caption: "Issue, diff y checklist en una vista.",
        screenTitle: "PR #142",
        screenLines: ["Reproduce el bug", "Patch mínimo", "Tests verdes"],
      },
    },
    {
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Humano vs asistente",
        leftLabel: "Tú",
        rightLabel: "IA",
        rows: [
          { topic: "Intención", left: "Define el outcome", right: "Propone borrador", icon: "target" },
          { topic: "Código", left: "Aprueba el diff", right: "Genera cambios", icon: "code" },
          { topic: "Riesgo", left: "Revisa edge cases", right: "Sugiere tests", icon: "terminal" },
        ],
      },
    },
    {
      template: "cta",
      variant: "question-big",
      data: {
        headline: "¿Qué parte del flujo quieres automatizar primero?",
        prompt: "Issue, patch o review",
        cta: "Duplica y adapta",
        icon: "spark",
      },
    },
  ],
};

export const SEED_CAROUSELS: SeedCarouselEntry[] = [
  { content: sampleCarousel, arc: "contrast", brandPresetKey: "light-infographic" },
  { content: sampleProcessCarousel, arc: "process", brandPresetKey: "light-infographic" },
  { content: seedCarouselOpenCode, arc: "contrast", brandPresetKey: "wireframe-studio" },
  { content: seedCarouselNumberStory, arc: "number-story", brandPresetKey: "tech-blue" },
  { content: seedCarouselMapStack, arc: "map", brandPresetKey: "forest-signal" },
  { content: seedCarouselMythIa, arc: "myth-bust", brandPresetKey: "slate-coral" },
  { content: seedCarouselSinglePunch, arc: "single-punch", brandPresetKey: "ink-mono" },
  { content: seedCarouselMobileVista, arc: "process", brandPresetKey: "tech-blue" },
  { content: seedCarouselBim, arc: "process", brandPresetKey: "sand-teal" },
  { content: seedCarouselIssuePr, arc: "contrast", brandPresetKey: "midnight-amber" },
];
