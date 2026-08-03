import type { CarouselContent } from "@/lib/schemas/carousel";

/**
 * Kit seed: 10 carruseles listos para duplicar.
 * Cada uno incluye al menos 1 slide de cada plantilla del catálogo (10 slides)
 * para previsualizar el estilo completo antes de quitar/añadir.
 */
export type SeedCarouselEntry = {
  content: CarouselContent;
  arc: string;
  brandPresetKey: string;
};

export const seedCarouselManualSistema: CarouselContent = {
  title: "De manual a sistema",
  topic: "Productividad con IA en estudios — kit completo de siluetas",
  tags: ["ia", "productividad", "kit"],
  visual: { motif: "bars", accentShift: "brand", contrast: "hard" },
  slides: [
    {
      template: "hook",
      variant: "split-icon",
      data: {
        eyebrow: "Carrusel 01",
        headline: "El cuello de botella no es el software",
        subline: "Es el proceso que nadie documentó.",
        icon: "lightbulb",
      },
    },
    {
      template: "phone-mock",
      variant: "default",
      data: {
        headline: "El brief en el bolsillo",
        caption: "Una idea clara cabe en la pantalla.",
        screenTitle: "Brief",
        screenLines: ["Ángulo", "Audiencia", "CTA"],
      },
    },
    {
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Manual vs sistema",
        leftLabel: "Antes",
        rightLabel: "Ahora",
        rows: [
          { topic: "Idea", left: "Se pierde en chats", right: "Brief tipado", icon: "lightbulb" },
          { topic: "Proceso", left: "Cada vez distinto", right: "Plantilla fija", icon: "process" },
          { topic: "Crecimiento", left: "Horas extras", right: "Iteración rápida", icon: "growth" },
        ],
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Tiempo a publicar",
        left: { label: "Manual", value: 18, caption: "Horas / pieza" },
        right: { label: "Sistema", value: 72, caption: "Minutos / pieza" },
        footer: "Misma calidad. Menos fricción.",
        icon: "chart-up",
      },
    },
    {
      template: "stat-hero",
      variant: "watermark",
      data: {
        value: "1",
        unit: "idea",
        headline: "Por diapositiva",
        detail: "Si cabe en un vistazo, frena el scroll.",
        icon: "target",
      },
    },
    {
      template: "ribbon-steps",
      variant: "diagonal",
      data: {
        headline: "Cómo lo armamos",
        steps: [
          { title: "Plantilla", detail: "Estilo propio", icon: "document", tone: "accent" },
          { title: "JSON", detail: "Editable ya", icon: "gears", tone: "accentAlt" },
          { title: "PDF", detail: "Listo LinkedIn", icon: "flag", tone: "highlight" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Checklist de calidad",
        steps: [
          { title: "Copy corto", detail: "Máximos Zod", icon: "check" },
          { title: "Iconos SVG", detail: "Catálogo fijo", icon: "chip" },
          { title: "CTA clara", detail: "Una pregunta", icon: "network" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Lo que ganas",
        rows: [
          { title: "Claridad", detail: "1 mensaje / slide", icon: "target", tone: "accent" },
          { title: "Ritmo", detail: "Export en minutos", icon: "chart-up", tone: "accentAlt" },
          { title: "Marca", detail: "Tokens + kits", icon: "layers", tone: "highlight" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "grid",
      data: {
        headline: "Piezas del sistema",
        subline: "Quita o añade según el post.",
        cells: [
          { label: "Hook", detail: "Curiosidad", icon: "lightbulb" },
          { label: "Dato", detail: "Stat hero", icon: "chart-up" },
          { label: "Proceso", detail: "Ribbons", icon: "process" },
          { label: "Cierre", detail: "CTA", icon: "flag" },
        ],
      },
    },
    {
      template: "cta",
      variant: "bottom-bar",
      data: {
        headline: "¿Qué proceso te está frenando?",
        prompt: "Cuéntamelo en comentarios",
        cta: "Guarda este carrusel",
        icon: "network",
      },
    },
  ],
};

export const seedCarouselBriefPasos: CarouselContent = {
  title: "Brief en 4 pasos",
  topic: "Cómo montar un carrusel sin improvisar — kit de siluetas",
  tags: ["proceso", "linkedin", "kit"],
  visual: { motif: "ribbons", accentShift: "brand", contrast: "soft" },
  slides: [
    {
      template: "hook",
      variant: "centered",
      data: {
        eyebrow: "Proceso",
        headline: "Del brief al PDF en una tarde",
        subline: "Sin reinventar el layout cada vez.",
        icon: "process",
      },
    },
    {
      template: "phone-mock",
      variant: "laptop",
      data: {
        headline: "Studio en desktop",
        caption: "Editas, previsualizas y exportas.",
        screenTitle: "Studio",
        screenLines: ["Brief", "Arco", "Export PDF"],
      },
    },
    {
      template: "vs-split",
      variant: "stacked-cards",
      data: {
        headline: "Improvisar vs método",
        leftLabel: "Caos",
        rightLabel: "Flujo",
        rows: [
          { topic: "Inicio", left: "Abrir Canva", right: "Duplicar kit", icon: "document" },
          { topic: "Estilo", left: "Colores sueltos", right: "BrandKit", icon: "layers" },
          { topic: "Fin", left: "Export dudoso", right: "PDF 1:1", icon: "flag" },
        ],
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Claridad percibida",
        left: { label: "Sin arco", value: 28, caption: "Se siente largo" },
        right: { label: "Con arco", value: 81, caption: "Se siente claro" },
        footer: "Misma info. Distinta secuencia.",
        icon: "target",
      },
    },
    {
      template: "stat-hero",
      variant: "left-rail",
      data: {
        value: "4",
        unit: "pasos",
        headline: "Del brief al export",
        detail: "Repetible cada semana.",
        icon: "process",
      },
    },
    {
      template: "ribbon-steps",
      variant: "numbered-rail",
      data: {
        headline: "El flujo",
        steps: [
          { title: "Brief", detail: "Ángulo + audiencia", icon: "document" },
          { title: "Arco", detail: "Elegir secuencia", icon: "target" },
          { title: "Episodio", detail: "Motivo + variants", icon: "gears" },
          { title: "Export", detail: "PDF LinkedIn", icon: "flag" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Checklist rápido",
        steps: [
          { title: "Copy corto", detail: "1 idea / slide", icon: "check" },
          { title: "Iconos SVG", detail: "Catálogo fijo", icon: "chip" },
          { title: "CTA clara", detail: "Una pregunta", icon: "network" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Errores típicos",
        rows: [
          { title: "Demasiado texto", detail: "El feed no lee", icon: "document" },
          { title: "Sin contraste", detail: "Se pierde el dato", icon: "search" },
          { title: "CTA débil", detail: "No hay cierre", icon: "flag" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "hero-cell",
      data: {
        headline: "Kit listo",
        subline: "Todas las siluetas en un post.",
        cells: [
          { label: "Hook", detail: "Portada", icon: "lightbulb", tone: "accent" },
          { label: "Device", detail: "Mock UI", icon: "globe" },
          { label: "Split", detail: "Contraste", icon: "process" },
          { label: "Bento", detail: "Mapa", icon: "layers" },
        ],
      },
    },
    {
      template: "cta",
      variant: "centered",
      data: {
        headline: "¿Quieres el siguiente paso del sistema?",
        prompt: "Comenta PROCESO",
        cta: "Guarda y aplica",
        icon: "growth",
      },
    },
  ],
};

export const seedCarouselOpenCode: CarouselContent = {
  title: "Open Code vs Claude Code",
  topic: "Comparativa open source multi-LLM vs Claude Code — kit completo",
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
      template: "phone-mock",
      variant: "browser",
      data: {
        headline: "La CLI en el navegador",
        caption: "Sesión, modelo y repo a la vista.",
        screenTitle: "agent",
        screenLines: ["Modelo: libre", "Repo local", "Diff listo"],
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
      template: "ab-compare",
      data: {
        headline: "Prioridad del equipo",
        left: { label: "Flexibilidad", value: 86, caption: "Open Code" },
        right: { label: "Integración", value: 78, caption: "Claude Code" },
        footer: "Elige según riesgo y vendor.",
        icon: "gears",
      },
    },
    {
      template: "stat-hero",
      variant: "stack",
      data: {
        value: "1",
        unit: "repo",
        headline: "Contexto que manda",
        detail: "Sin el código, el agente improvisa.",
        icon: "code",
      },
    },
    {
      template: "ribbon-steps",
      variant: "diagonal",
      data: {
        headline: "Cómo decidir",
        steps: [
          { title: "Política", detail: "Datos y cloud", icon: "document", tone: "accent" },
          { title: "Modelo", detail: "Fijo o libre", icon: "spark", tone: "accentAlt" },
          { title: "Ops", detail: "Quién opera", icon: "users", tone: "highlight" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Prueba en 3 pasos",
        steps: [
          { title: "Mismo issue", detail: "Ambos agentes", icon: "target" },
          { title: "Mide diff", detail: "Calidad + tiempo", icon: "chart-up" },
          { title: "Decide stack", detail: "Documenta regla", icon: "check" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Qué mirar antes de elegir",
        rows: [
          { title: "Vendor lock", detail: "¿Cambias de modelo?", icon: "gears" },
          { title: "Equipo", detail: "Quién paga y opera", icon: "users" },
          { title: "Contexto", detail: "Repos, repo, políticas", icon: "layers" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "grid",
      data: {
        headline: "Señales del stack",
        subline: "Cuatro checks rápidos.",
        cells: [
          { label: "LLM", detail: "Libre / fijo", icon: "brain" },
          { label: "CLI", detail: "Terminal", icon: "terminal" },
          { label: "Repo", detail: "Contexto", icon: "code" },
          { label: "Cloud", detail: "Datos", icon: "cloud" },
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
  topic: "Cómo un dato grande frena el scroll — kit de siluetas",
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
      template: "phone-mock",
      variant: "default",
      data: {
        headline: "Así se ve el stop",
        caption: "El pulgar frena si el dato es legible.",
        screenTitle: "Feed",
        screenLines: ["3s decisión", "1 idea", "CTA"],
      },
    },
    {
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Párrafo vs número",
        leftLabel: "Wall",
        rightLabel: "Stat",
        rows: [
          { topic: "Lectura", left: "Escanea y pasa", right: "Para y mira", icon: "search" },
          { topic: "Memoria", left: "Se difumina", right: "Queda el %", icon: "brain" },
          { topic: "Share", left: "Difícil citar", right: "Fácil citar", icon: "growth" },
        ],
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
      template: "ribbon-steps",
      variant: "numbered-rail",
      data: {
        headline: "Receta del número",
        steps: [
          { title: "Elige", detail: "Una métrica", icon: "target", tone: "accent" },
          { title: "Recorta", detail: "Unidad corta", icon: "document", tone: "accentAlt" },
          { title: "Ancla", detail: "Frase de 1 línea", icon: "flag", tone: "highlight" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Cómo validar el dato",
        steps: [
          { title: "Fuente", detail: "¿De dónde sale?", icon: "document" },
          { title: "Contexto", detail: "¿Versus qué?", icon: "layers" },
          { title: "Acción", detail: "¿Qué hacer?", icon: "flag" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Reglas del golpe",
        rows: [
          { title: "Un número", detail: "No satures", icon: "target" },
          { title: "Contraste", detail: "Ink vs fondo", icon: "check" },
          { title: "Unidad clara", detail: "% · x · €", icon: "coin" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "hero-cell",
      data: {
        headline: "Formatos que funcionan",
        subline: "Elige uno y repite.",
        cells: [
          { label: "%", detail: "Comparativa", icon: "chart-up", tone: "accent" },
          { label: "x", detail: "Multiplicador", icon: "growth" },
          { label: "s", detail: "Tiempo", icon: "target" },
          { label: "n", detail: "Conteo", icon: "layers" },
        ],
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
  topic: "Visión rápida de capas tech — kit completo de plantillas",
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
      template: "phone-mock",
      variant: "laptop",
      data: {
        headline: "Mapa en el portátil",
        caption: "Capas visibles de un vistazo.",
        screenTitle: "Stack",
        screenLines: ["Datos", "Modelo", "Automatizar", "Publicar"],
      },
    },
    {
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Caos vs mapa",
        leftLabel: "Sin mapa",
        rightLabel: "Con mapa",
        rows: [
          { topic: "Onboarding", left: "Oral y frágil", right: "Visual y fijo", icon: "users" },
          { topic: "Deuda", left: "Herramientas sueltas", right: "Roles claros", icon: "gears" },
          { topic: "Decisión", left: "Opinión", right: "Celda vacía", icon: "target" },
        ],
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Claridad del equipo",
        left: { label: "Sin mapa", value: 31, caption: "Confusión" },
        right: { label: "Con mapa", value: 84, caption: "Alineados" },
        footer: "Una slide alinea más que un memo.",
        icon: "layers",
      },
    },
    {
      template: "stat-hero",
      variant: "stack",
      data: {
        value: "4",
        unit: "celdas",
        headline: "Bastan para el stack",
        detail: "Si no cabe, sobra complejidad.",
        icon: "chip",
      },
    },
    {
      template: "ribbon-steps",
      variant: "diagonal",
      data: {
        headline: "De la idea al mapa",
        steps: [
          { title: "Lista", detail: "Herramientas", icon: "document" },
          { title: "Agrupa", detail: "Por capa", icon: "layers" },
          { title: "Dibuja", detail: "4 celdas", icon: "target" },
          { title: "Publica", detail: "Comparte", icon: "flag" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Reglas del mapa",
        steps: [
          { title: "Una celda", detail: "Un rol", icon: "target" },
          { title: "Icono SVG", detail: "Sin emojis", icon: "check" },
          { title: "Detalle corto", detail: "Una línea", icon: "document" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Capas que suelen faltar",
        rows: [
          { title: "Fuente de datos", detail: "Quién es dueño", icon: "cloud" },
          { title: "Automatización", detail: "Scripts + IA", icon: "spark" },
          { title: "Publicación", detail: "PDF / web", icon: "globe" },
        ],
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
  topic: "Tres creencias que frenan adopción — kit de siluetas",
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
      template: "phone-mock",
      variant: "browser",
      data: {
        headline: "El chat no es el proceso",
        caption: "Sin brief, el output es ruido.",
        screenTitle: "Chat",
        screenLines: ["Brief tipado", "Revisión humana", "Decisión"],
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
      template: "ab-compare",
      data: {
        headline: "Confianza tras revisión",
        left: { label: "Sin review", value: 24, caption: "Riesgo alto" },
        right: { label: "Con review", value: 88, caption: "Usable" },
        footer: "La IA propone. El criterio cierra.",
        icon: "check",
      },
    },
    {
      template: "stat-hero",
      variant: "left-rail",
      data: {
        value: "80%",
        unit: "",
        headline: "Del valor está en el brief",
        detail: "Mal input → mal output.",
        icon: "document",
      },
    },
    {
      template: "ribbon-steps",
      variant: "numbered-rail",
      data: {
        headline: "Adopción sensata",
        steps: [
          { title: "Caso", detail: "Tarea repetible", icon: "target" },
          { title: "Guardrail", detail: "Quién revisa", icon: "users" },
          { title: "Métrica", detail: "Tiempo ganado", icon: "chart-up" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Piloto en 3 pasos",
        steps: [
          { title: "Elige 1 tarea", detail: "Bajo riesgo", icon: "target" },
          { title: "Define review", detail: "Humano firma", icon: "check" },
          { title: "Mide 2 semanas", detail: "Antes / después", icon: "chart-up" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Qué sí funciona ya",
        rows: [
          { title: "Borradores", detail: "Primera pasada", icon: "spark", tone: "accent" },
          { title: "Checklists", detail: "No olvidar pasos", icon: "check", tone: "accentAlt" },
          { title: "Variantes", detail: "Probar ángulos", icon: "process", tone: "highlight" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "grid",
      data: {
        headline: "Zonas verdes",
        subline: "Empieza aquí.",
        cells: [
          { label: "Resumen", detail: "Docs largos", icon: "document" },
          { label: "Draft", detail: "Copy / email", icon: "spark" },
          { label: "QA", detail: "Listas", icon: "search" },
          { label: "Ideas", detail: "Ángulos", icon: "lightbulb" },
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
  topic: "Kit completo con el número como héroe visual",
  tags: ["dato", "impacto", "kit"],
  visual: { motif: "none", accentShift: "brand", contrast: "hard" },
  slides: [
    {
      template: "hook",
      variant: "centered",
      data: {
        eyebrow: "Single punch",
        headline: "Menos ruido. Más golpe.",
        subline: "El número manda. El resto sostiene.",
        icon: "target",
      },
    },
    {
      template: "phone-mock",
      variant: "default",
      data: {
        headline: "El dato en el feed",
        caption: "Grande. Limpio. Sin adornos.",
        screenTitle: "70%",
        screenLines: ["Del valor", "está en el hook"],
      },
    },
    {
      template: "vs-split",
      variant: "stacked-cards",
      data: {
        headline: "Ruido vs golpe",
        leftLabel: "Ruido",
        rightLabel: "Golpe",
        rows: [
          { topic: "Foco", left: "5 ideas a la vez", right: "1 número", icon: "target" },
          { topic: "Texto", left: "Párrafos", right: "Una línea", icon: "document" },
          { topic: "Fondo", left: "Decoración", right: "Plano / none", icon: "layers" },
        ],
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Retención del mensaje",
        left: { label: "Multi-idea", value: 29, caption: "Se diluye" },
        right: { label: "Un golpe", value: 91, caption: "Se recuerda" },
        footer: "Menos slides no siempre: mejor foco.",
        icon: "brain",
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
      template: "ribbon-steps",
      variant: "diagonal",
      data: {
        headline: "Anatomía del golpe",
        steps: [
          { title: "Hook", detail: "Promesa", icon: "lightbulb", tone: "accent" },
          { title: "Número", detail: "Prueba", icon: "chart-up", tone: "highlight" },
          { title: "CTA", detail: "Acción", icon: "flag", tone: "accentAlt" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Antes de publicar",
        steps: [
          { title: "¿Se lee a 1 m?", detail: "Prueba móvil", icon: "globe" },
          { title: "¿Hay una unidad?", detail: "% · x · n", icon: "check" },
          { title: "¿Hay cierre?", detail: "Pregunta clara", icon: "network" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Qué quitar siempre",
        rows: [
          { title: "Adjetivos", detail: "Sobran", icon: "document" },
          { title: "Segundos datos", detail: "Compiten", icon: "chart-up" },
          { title: "Ornamentos", detail: "Motif none", icon: "layers" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "grid",
      data: {
        headline: "Kit del golpe",
        subline: "Usa o elimina slides.",
        cells: [
          { label: "Hook", detail: "Centered", icon: "target" },
          { label: "Stat", detail: "Stack", icon: "chart-up" },
          { label: "Phone", detail: "Feed UI", icon: "globe" },
          { label: "CTA", detail: "Cierre", icon: "flag" },
        ],
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
  topic: "Diseño pensado para scroll en teléfono — kit con device frames",
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
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Desktop vs móvil",
        leftLabel: "Desktop",
        rightLabel: "Móvil",
        rows: [
          { topic: "Lectura", left: "Más margen", right: "Pulgar + scroll", icon: "globe" },
          { topic: "Tipo", left: "Cabe más", right: "Menos palabras", icon: "document" },
          { topic: "CTA", left: "Visible", right: "Debe ser grande", icon: "flag" },
        ],
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Legibilidad en teléfono",
        left: { label: "Texto denso", value: 19, caption: "Zoom mental" },
        right: { label: "1 idea", value: 87, caption: "Se entiende" },
        footer: "Diseña para el pulgar primero.",
        icon: "target",
      },
    },
    {
      template: "stat-hero",
      variant: "watermark",
      data: {
        value: "1m",
        unit: "",
        headline: "Distancia de lectura",
        detail: "Si no se lee al brazo, recorta.",
        icon: "search",
      },
    },
    {
      template: "ribbon-steps",
      variant: "numbered-rail",
      data: {
        headline: "Flujo de revisión",
        steps: [
          { title: "Export", detail: "PDF 1:1", icon: "document", tone: "accent" },
          { title: "Teléfono", detail: "Abre el PDF", icon: "globe", tone: "accentAlt" },
          { title: "Ajuste", detail: "Copy / contrast", icon: "gears", tone: "highlight" },
        ],
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
      template: "icon-rows",
      data: {
        headline: "Siluetas device",
        rows: [
          { title: "Phone", detail: "variant default", icon: "globe", tone: "accent" },
          { title: "Laptop", detail: "variant laptop", icon: "chip", tone: "accentAlt" },
          { title: "Browser", detail: "variant browser", icon: "network", tone: "highlight" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "grid",
      data: {
        headline: "Prioridades UX",
        subline: "Orden de impacto.",
        cells: [
          { label: "Tipo", detail: "Tamaño", icon: "document" },
          { label: "Contraste", detail: "Legible", icon: "target" },
          { label: "Espacio", detail: "Air", icon: "layers" },
          { label: "CTA", detail: "Cierre", icon: "flag" },
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
  topic: "Proceso de información en proyectos AEC — kit completo",
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
      template: "phone-mock",
      variant: "laptop",
      data: {
        headline: "Modelo en pantalla",
        caption: "Coordinación visible, no oral.",
        screenTitle: "CDE",
        screenLines: ["IFC sync", "Clash open", "Issue #28"],
      },
    },
    {
      template: "vs-split",
      variant: "columns",
      data: {
        headline: "Plano vs modelo",
        leftLabel: "2D",
        rightLabel: "BIM",
        rows: [
          { topic: "Dato", left: "En el dibujo", right: "En el objeto", icon: "layers" },
          { topic: "Cambio", left: "Versiones sueltas", right: "Historial CDE", icon: "process" },
          { topic: "Entrega", left: "PDF estático", right: "Modelo + datos", icon: "flag" },
        ],
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Errores detectados pronto",
        left: { label: "Obra", value: 35, caption: "Caro" },
        right: { label: "Modelo", value: 82, caption: "Barato" },
        footer: "Coordinar antes de construir.",
        icon: "building",
      },
    },
    {
      template: "stat-hero",
      variant: "left-rail",
      data: {
        value: "LOD",
        unit: "",
        headline: "Acordado o improvisado",
        detail: "Sin LOD, el modelo miente.",
        icon: "layers",
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
      template: "steps",
      data: {
        headline: "Arranque de proyecto",
        steps: [
          { title: "BEP corto", detail: "Quién / qué / cuándo", icon: "document" },
          { title: "CDE vivo", detail: "Una fuente", icon: "cloud" },
          { title: "QA semanal", detail: "Issues cerrados", icon: "check" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Señales de madurez",
        rows: [
          { title: "Nombres", detail: "Convención fija", icon: "document" },
          { title: "Clashes", detail: "Antes de obra", icon: "search" },
          { title: "Entrega", detail: "Datos útiles", icon: "flag" },
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
  topic: "Flujo issue → código → revisión — kit completo de siluetas",
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
      template: "ab-compare",
      data: {
        headline: "Tiempo a PR usable",
        left: { label: "Solo", value: 34, caption: "Sin asistente" },
        right: { label: "Con IA", value: 76, caption: "+ review humana" },
        footer: "Velocidad sin saltarse el criterio.",
        icon: "spark",
      },
    },
    {
      template: "stat-hero",
      variant: "watermark",
      data: {
        value: "1",
        unit: "issue",
        headline: "Un contexto limpio",
        detail: "Sin issue claro, el PR divaga.",
        icon: "document",
      },
    },
    {
      template: "ribbon-steps",
      variant: "diagonal",
      data: {
        headline: "Pipeline",
        steps: [
          { title: "Issue", detail: "Repro + outcome", icon: "document", tone: "accent" },
          { title: "Patch", detail: "Diff mínimo", icon: "code", tone: "accentAlt" },
          { title: "Tests", detail: "Verdes", icon: "check", tone: "highlight" },
          { title: "Review", detail: "Humano firma", icon: "users", tone: "surface" },
        ],
      },
    },
    {
      template: "steps",
      data: {
        headline: "Antes de pedir review",
        steps: [
          { title: "Reproduce", detail: "Pasos claros", icon: "search" },
          { title: "Scope", detail: "Sin drive-by", icon: "target" },
          { title: "Checklist", detail: "Tests + lint", icon: "check" },
        ],
      },
    },
    {
      template: "icon-rows",
      data: {
        headline: "Señales de un buen PR",
        rows: [
          { title: "Título", detail: "Dice el porqué", icon: "document" },
          { title: "Diff corto", detail: "Fácil de revisar", icon: "code" },
          { title: "Tests", detail: "Cubren el bug", icon: "terminal" },
        ],
      },
    },
    {
      template: "icon-bento",
      variant: "hero-cell",
      data: {
        headline: "Roles en el flujo",
        subline: "Quién hace qué.",
        cells: [
          { label: "Issue", detail: "Humano", icon: "target", tone: "accent" },
          { label: "Draft", detail: "IA", icon: "spark" },
          { label: "Tests", detail: "IA + CI", icon: "terminal" },
          { label: "Merge", detail: "Humano", icon: "check" },
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
  { content: seedCarouselManualSistema, arc: "contrast", brandPresetKey: "light-infographic" },
  { content: seedCarouselBriefPasos, arc: "process", brandPresetKey: "light-infographic" },
  { content: seedCarouselOpenCode, arc: "contrast", brandPresetKey: "wireframe-studio" },
  { content: seedCarouselNumberStory, arc: "number-story", brandPresetKey: "tech-blue" },
  { content: seedCarouselMapStack, arc: "map", brandPresetKey: "forest-signal" },
  { content: seedCarouselMythIa, arc: "myth-bust", brandPresetKey: "slate-coral" },
  { content: seedCarouselSinglePunch, arc: "single-punch", brandPresetKey: "ink-mono" },
  { content: seedCarouselMobileVista, arc: "process", brandPresetKey: "tech-blue" },
  { content: seedCarouselBim, arc: "process", brandPresetKey: "sand-teal" },
  { content: seedCarouselIssuePr, arc: "contrast", brandPresetKey: "midnight-amber" },
];

/** Alias para studio / nuevos posts (kit completo). */
export const sampleCarousel = seedCarouselManualSistema;
export const sampleProcessCarousel = seedCarouselBriefPasos;
