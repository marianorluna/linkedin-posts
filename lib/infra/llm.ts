import { carouselSchema, type CarouselContent } from "@/lib/schemas/carousel";
import { listNarrativeArcs } from "@/lib/domain/narrative-arcs";
import { TEMPLATE_VARIANTS } from "@/lib/schemas/variants";

const ARCS_DOC = listNarrativeArcs()
  .map(
    (a) =>
      `- ${a.id}: ${a.useWhen}. Secuencia: ${a.sequence.join(" → ")}. visual tipico: ${JSON.stringify(a.visual)}. variants: ${JSON.stringify(a.variants)}`,
  )
  .join("\n");

const VARIANTS_DOC = Object.entries(TEMPLATE_VARIANTS)
  .map(([slug, variants]) => `- ${slug}: ${variants.join(" | ")}`)
  .join("\n");

const SYSTEM_PROMPT = `Eres un editor de carruseles LinkedIn (documento PDF, slides 1080x1080).
Devuelves SOLO JSON válido que cumpla este contrato:
{
  "title": string,
  "topic": string,
  "tags": string[],
  "visual": {
    "mood"?: "dark-wire"|"light-flat"|"bold-blocks",
    "density"?: "air"|"compact",
    "motif"?: "orbs"|"orbs-tl"|"orbs-center"|"arcs"|"blocks"|"dots"|"grid"|"ribbons"|"bars"|"diagonal"|"none",
    "accentShift"?: "brand"|"alt"|"highlight",
    "contrast"?: "soft"|"hard"
  },
  "slides": [
    { "template": "...", "variant"?: string, "data": {...} }
  ]
}

Plantillas y cuándo usarlas:
- hook: portada (eyebrow, headline, subline, icon opcional).
- ab-compare: dos % 0–100 (antes/después).
- stat-hero: un número grande + frase.
- steps: 2–3 pasos (icon opcional por paso).
- phone-mock: maqueta móvil, 1–4 screenLines.
- cta: cierre con pregunta/CTA (icon opcional).
- vs-split: comparativa A/B por filas con icono central (2–4 rows: topic, left, right, icon).
- ribbon-steps: 3–4 banners numerados (title, detail, icon).
- icon-rows: 2–4 filas con icono obligatorio.
- icon-bento: 3–6 celdas (label, detail, icon).

Variantes permitidas por plantilla (elige una; si omites, se usa la primera):
${VARIANTS_DOC}

Arcos narrativos (elige UNO según el brief; no uses siempre el mismo):
${ARCS_DOC}

Iconos permitidos (SVG): lightbulb, gears, chart-up, brain, target, flag, users, process, globe, cloud, chip, robot, network, document, check, growth, coin, search.

Reglas de contenido:
- Español.
- Poco texto: 1 idea por slide. Headlines cortos.
- Empieza en hook y termina en cta. Secuencia según el arco elegido (puedes insertar 1 slide extra de valor si aporta).
- Incluye "visual" coherente con el arco (motif + accentShift + contrast). Usa motif "none" si quieres fondo plano sin figuras; no repitas siempre "orbs".
- Incluye "variant" en hook/cta y en slides con variantes tipicas del arco.
- Usa solo plantillas del catálogo; no inventes templates, variants ni icon ids.
- Nada de relleno corporativo ni párrafos largos.
- Visual-first: el copy debe dejar aire en el layout.
- Evita repetir siempre vs-split + ribbon-steps; diversifica según el argumento del brief.`;

export type GenerateResult = {
  content: CarouselContent;
  provider: "anthropic" | "openai" | "demo";
  model?: string;
};

function demoCarousel(brief: string): CarouselContent {
  const topic = brief.trim().slice(0, 80) || "Tema del carrusel";
  return carouselSchema.parse({
    title: topic.slice(0, 60),
    topic,
    tags: ["linkedin", "carrusel"],
    visual: { motif: "orbs", accentShift: "highlight", contrast: "soft" },
    slides: [
      {
        template: "hook",
        variant: "type-dominant",
        data: {
          eyebrow: "Dato clave",
          headline: topic.length > 40 ? `${topic.slice(0, 40)}…` : topic,
          subline: "Un número. Una idea. Desliza.",
          icon: "chart-up",
        },
      },
      {
        template: "stat-hero",
        variant: "watermark",
        data: {
          value: "3×",
          unit: "",
          headline: "Más claro que un post de texto",
          detail: "Carrusel visual, una idea por slide.",
          icon: "growth",
        },
      },
      {
        template: "icon-rows",
        data: {
          headline: "Por qué funciona",
          rows: [
            { title: "Hook fuerte", detail: "Curiosidad en 1s", icon: "lightbulb" },
            { title: "Prueba visual", detail: "Dato o contraste", icon: "target" },
            { title: "CTA claro", detail: "Una pregunta", icon: "flag" },
          ],
        },
      },
      {
        template: "cta",
        variant: "question-big",
        data: {
          headline: "¿Qué métrica mueve tu estudio?",
          prompt: "Escríbela abajo",
          cta: "Guarda y comparte",
          icon: "network",
        },
      },
    ],
  });
}

async function generateWithOpenAI(brief: string): Promise<GenerateResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY missing");
  const base = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Crea un carrusel LinkedIn sobre: ${brief}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI error: ${response.status} ${text}`);
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = json.choices?.[0]?.message?.content;
  if (!raw) throw new Error("OpenAI sin contenido");
  const content = carouselSchema.parse(JSON.parse(raw));
  return { content, provider: "openai", model };
}

async function generateWithAnthropic(brief: string): Promise<GenerateResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY missing");
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Crea un carrusel LinkedIn sobre: ${brief}\nResponde únicamente con JSON.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Anthropic error: ${response.status} ${text}`);
  }

  const json = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = json.content?.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("Anthropic sin contenido");
  const cleaned = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const content = carouselSchema.parse(JSON.parse(cleaned));
  return { content, provider: "anthropic", model };
}

export async function generateCarouselFromBrief(brief: string): Promise<GenerateResult> {
  const trimmed = brief.trim();
  if (!trimmed) {
    throw new Error("El brief no puede estar vacío");
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return generateWithAnthropic(trimmed);
  }
  if (process.env.OPENAI_API_KEY) {
    return generateWithOpenAI(trimmed);
  }
  return { content: demoCarousel(trimmed), provider: "demo" };
}
