import { z } from "zod";
import { ICON_IDS } from "@/lib/icons/registry";

const short = (max: number) => z.string().trim().min(1).max(max);
const optionalShort = (max: number) => z.string().trim().max(max).optional().default("");
const iconIdSchema = z.enum(ICON_IDS);
const optionalIcon = iconIdSchema.optional();

export const hookSlideSchema = z.object({
  template: z.literal("hook"),
  data: z.object({
    eyebrow: optionalShort(32),
    headline: short(64),
    subline: optionalShort(80),
    icon: optionalIcon,
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
    icon: optionalIcon,
  }),
});

export const statHeroSlideSchema = z.object({
  template: z.literal("stat-hero"),
  data: z.object({
    value: short(12),
    unit: optionalShort(12),
    headline: short(56),
    detail: optionalShort(80),
    icon: optionalIcon,
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
          icon: optionalIcon,
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
    icon: optionalIcon,
  }),
});

export const vsSplitSlideSchema = z.object({
  template: z.literal("vs-split"),
  data: z.object({
    headline: short(48),
    leftLabel: short(20),
    rightLabel: short(20),
    rows: z
      .array(
        z.object({
          topic: short(24),
          left: short(48),
          right: short(48),
          icon: iconIdSchema,
        }),
      )
      .min(2)
      .max(4),
  }),
});

export const ribbonStepsSlideSchema = z.object({
  template: z.literal("ribbon-steps"),
  data: z.object({
    headline: short(48),
    steps: z
      .array(
        z.object({
          title: short(28),
          detail: optionalShort(56),
          icon: optionalIcon,
        }),
      )
      .min(3)
      .max(4),
  }),
});

export const iconRowsSlideSchema = z.object({
  template: z.literal("icon-rows"),
  data: z.object({
    headline: short(48),
    rows: z
      .array(
        z.object({
          title: short(28),
          detail: optionalShort(56),
          icon: iconIdSchema,
        }),
      )
      .min(2)
      .max(4),
  }),
});

export const iconBentoSlideSchema = z.object({
  template: z.literal("icon-bento"),
  data: z.object({
    headline: short(48),
    subline: optionalShort(64),
    cells: z
      .array(
        z.object({
          label: short(24),
          detail: optionalShort(48),
          icon: iconIdSchema,
        }),
      )
      .min(3)
      .max(6),
  }),
});

export const slideSchema = z.discriminatedUnion("template", [
  hookSlideSchema,
  abCompareSlideSchema,
  statHeroSlideSchema,
  stepsSlideSchema,
  phoneMockSlideSchema,
  ctaSlideSchema,
  vsSplitSlideSchema,
  ribbonStepsSlideSchema,
  iconRowsSlideSchema,
  iconBentoSlideSchema,
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
  "vs-split",
  "ribbon-steps",
  "icon-rows",
  "icon-bento",
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
        icon: "lightbulb",
      },
    },
    {
      template: "vs-split",
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
      template: "ribbon-steps",
      data: {
        headline: "Cómo lo armamos",
        steps: [
          { title: "Plantilla", detail: "Estilo propio", icon: "document" },
          { title: "JSON", detail: "Editable en segundos", icon: "gears" },
          { title: "PDF", detail: "Listo para LinkedIn", icon: "flag" },
        ],
      },
    },
    {
      template: "icon-bento",
      data: {
        headline: "Lo que cambia",
        subline: "Menos fricción visual, más mensaje.",
        cells: [
          { label: "Claridad", detail: "1 idea / slide", icon: "target" },
          { label: "Sistema", detail: "Tokens + kits", icon: "chip" },
          { label: "Ritmo", detail: "Export en minutos", icon: "chart-up" },
          { label: "Marca", detail: "Look propio", icon: "check" },
        ],
      },
    },
    {
      template: "cta",
      data: {
        headline: "¿Qué proceso te está frenando?",
        prompt: "Cuéntamelo en comentarios",
        cta: "Guarda este carrusel",
        icon: "network",
      },
    },
  ],
};
