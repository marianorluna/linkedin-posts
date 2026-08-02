import { z } from "zod";

const short = (max: number) => z.string().trim().min(1).max(max);
const optionalShort = (max: number) => z.string().trim().max(max).optional().default("");

export const hookSlideSchema = z.object({
  template: z.literal("hook"),
  data: z.object({
    eyebrow: optionalShort(32),
    headline: short(64),
    subline: optionalShort(80),
  }),
});

export const abCompareSlideSchema = z.object({
  template: z.literal("ab-compare"),
  data: z.object({
    headline: short(56),
    left: z.object({
      label: short(24),
      value: z.number().min(0).max(100),
      caption: optionalShort(40),
    }),
    right: z.object({
      label: short(24),
      value: z.number().min(0).max(100),
      caption: optionalShort(40),
    }),
    footer: optionalShort(60),
  }),
});

export const statHeroSlideSchema = z.object({
  template: z.literal("stat-hero"),
  data: z.object({
    value: short(12),
    unit: optionalShort(12),
    headline: short(56),
    detail: optionalShort(80),
  }),
});

export const stepsSlideSchema = z.object({
  template: z.literal("steps"),
  data: z.object({
    headline: short(56),
    steps: z
      .array(
        z.object({
          title: short(32),
          detail: optionalShort(64),
        }),
      )
      .min(2)
      .max(3),
  }),
});

export const phoneMockSlideSchema = z.object({
  template: z.literal("phone-mock"),
  data: z.object({
    headline: short(56),
    caption: optionalShort(80),
    screenTitle: short(28),
    screenLines: z.array(short(40)).min(1).max(4),
  }),
});

export const ctaSlideSchema = z.object({
  template: z.literal("cta"),
  data: z.object({
    headline: short(64),
    prompt: optionalShort(80),
    cta: short(40),
  }),
});

export const slideSchema = z.discriminatedUnion("template", [
  hookSlideSchema,
  abCompareSlideSchema,
  statHeroSlideSchema,
  stepsSlideSchema,
  phoneMockSlideSchema,
  ctaSlideSchema,
]);

export const carouselSchema = z.object({
  title: short(80),
  topic: short(120),
  tags: z.array(short(24)).max(8).default([]),
  slides: z.array(slideSchema).min(2).max(12),
});

export type CarouselContent = z.infer<typeof carouselSchema>;
export type SlideContent = z.infer<typeof slideSchema>;
export type TemplateSlug = SlideContent["template"];

export const TEMPLATE_SLUGS = [
  "hook",
  "ab-compare",
  "stat-hero",
  "steps",
  "phone-mock",
  "cta",
] as const satisfies readonly TemplateSlug[];

export const sampleCarousel: CarouselContent = {
  title: "De manual a sistema",
  topic: "Productividad con IA en estudios",
  tags: ["ia", "productividad"],
  slides: [
    {
      template: "hook",
      data: {
        eyebrow: "Carrusel 01",
        headline: "El cuello de botella no es el software",
        subline: "Es el proceso que nadie documentó.",
      },
    },
    {
      template: "ab-compare",
      data: {
        headline: "Tiempo en tareas repetitivas",
        left: { label: "Antes", value: 72, caption: "Manual" },
        right: { label: "Después", value: 18, caption: "Con sistema" },
        footer: "Misma calidad, menos fricción",
      },
    },
    {
      template: "stat-hero",
      data: {
        value: "4.2x",
        unit: "",
        headline: "Más iteraciones por semana",
        detail: "Cuando el layout ya no se redibuja a mano.",
      },
    },
    {
      template: "steps",
      data: {
        headline: "Cómo lo armamos",
        steps: [
          { title: "Plantilla fija", detail: "Estilo propio, no improvisado" },
          { title: "Contenido JSON", detail: "Editable en segundos" },
          { title: "Export PDF", detail: "Listo para LinkedIn" },
        ],
      },
    },
    {
      template: "phone-mock",
      data: {
        headline: "Se ve nítido en móvil",
        caption: "Una idea por diapositiva. Poco texto.",
        screenTitle: "Preview",
        screenLines: ["Hook claro", "Dato visual", "CTA al final"],
      },
    },
    {
      template: "cta",
      data: {
        headline: "¿Qué proceso te está frenando?",
        prompt: "Cuéntamelo en comentarios",
        cta: "Guarda este carrusel",
      },
    },
  ],
};
