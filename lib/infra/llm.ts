import { carouselSchema, type CarouselContent } from "@/lib/schemas/carousel";

const SYSTEM_PROMPT = `Eres un editor de carruseles LinkedIn (documento PDF, slides 1080x1080).
Devuelves SOLO JSON válido que cumpla este contrato:
{
  "title": string,
  "topic": string,
  "tags": string[],
  "slides": [
    { "template": "hook"|"ab-compare"|"stat-hero"|"steps"|"phone-mock"|"cta"|"vs-split"|"ribbon-steps"|"icon-rows"|"icon-bento", "data": {...} }
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

Iconos permitidos (SVG): lightbulb, gears, chart-up, brain, target, flag, users, process, globe, cloud, chip, robot, network, document, check, growth, coin, search.

Reglas de contenido:
- Español.
- Poco texto: 1 idea por slide. Headlines cortos.
- Estructura típica: hook → 2–4 slides de valor (prioriza vs-split / ribbon-steps / icon-bento / icon-rows) → cta.
- Usa solo plantillas del catálogo; no inventes templates ni icon ids.
- Nada de relleno corporativo ni párrafos largos.
- Visual-first: el copy debe dejar aire en el layout.`;

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
    slides: [
      {
        template: "hook",
        data: {
          eyebrow: "Idea rápida",
          headline: topic.length > 40 ? `${topic.slice(0, 40)}…` : topic,
          subline: "Desliza: una idea clara por diapositiva.",
        },
      },
      {
        template: "vs-split",
        data: {
          headline: "Antes vs sistema",
          leftLabel: "Antes",
          rightLabel: "Ahora",
          rows: [
            { topic: "Idea", left: "Se pierde", right: "Brief claro", icon: "lightbulb" },
            { topic: "Proceso", left: "Improvisado", right: "Plantilla", icon: "process" },
            { topic: "Ritmo", left: "Lento", right: "Iterativo", icon: "growth" },
          ],
        },
      },
      {
        template: "ribbon-steps",
        data: {
          headline: "Cómo lo armamos",
          steps: [
            { title: "Brief", detail: "Una idea", icon: "document" },
            { title: "Layout", detail: "Plantilla fija", icon: "gears" },
            { title: "Export", detail: "PDF LinkedIn", icon: "flag" },
          ],
        },
      },
      {
        template: "cta",
        data: {
          headline: "¿Cuál es tu mayor fricción hoy?",
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
