import { z } from "zod";
import { REPEATABLE_LIMITS } from "@/lib/domain/repeatable-items";
import { ICON_IDS } from "@/lib/icons/registry";
import { episodeVisualSchema } from "@/lib/schemas/episode-visual";
import { itemToneSchema } from "@/lib/schemas/item-tone";
import { layoutSchemaForSlots, TEMPLATE_SLOTS } from "@/lib/schemas/layout";
import { TEMPLATE_VARIANTS } from "@/lib/schemas/variants";

const short = (max: number) => z.string().trim().min(1).max(max);
const optionalShort = (max: number) => z.string().trim().max(max).optional().default("");
const iconIdSchema = z.enum(ICON_IDS);
const optionalIcon = iconIdSchema.optional();

const hookVariant = z.enum(TEMPLATE_VARIANTS.hook);
const ctaVariant = z.enum(TEMPLATE_VARIANTS.cta);
const statHeroVariant = z.enum(TEMPLATE_VARIANTS["stat-hero"]);
const vsSplitVariant = z.enum(TEMPLATE_VARIANTS["vs-split"]);
const ribbonStepsVariant = z.enum(TEMPLATE_VARIANTS["ribbon-steps"]);
const iconBentoVariant = z.enum(TEMPLATE_VARIANTS["icon-bento"]);
const defaultOnlyVariant = z.enum(TEMPLATE_VARIANTS["ab-compare"]);

export const hookSlideSchema = z.object({
  template: z.literal("hook"),
  variant: hookVariant.optional(),
  data: z.object({
    eyebrow: optionalShort(32),
    headline: short(64),
    subline: optionalShort(80),
    icon: optionalIcon,
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS.hook),
});

export const abCompareSlideSchema = z.object({
  template: z.literal("ab-compare"),
  variant: defaultOnlyVariant.optional(),
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
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["ab-compare"]),
});

export const statHeroSlideSchema = z.object({
  template: z.literal("stat-hero"),
  variant: statHeroVariant.optional(),
  data: z.object({
    value: short(12),
    unit: optionalShort(12),
    headline: short(56),
    detail: optionalShort(80),
    icon: optionalIcon,
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["stat-hero"]),
});

export const stepsSlideSchema = z.object({
  template: z.literal("steps"),
  variant: z.enum(TEMPLATE_VARIANTS.steps).optional(),
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
      .min(REPEATABLE_LIMITS.steps.min)
      .max(REPEATABLE_LIMITS.steps.max),
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS.steps),
});

export const phoneMockSlideSchema = z.object({
  template: z.literal("phone-mock"),
  variant: z.enum(TEMPLATE_VARIANTS["phone-mock"]).optional(),
  data: z.object({
    headline: short(56),
    caption: optionalShort(80),
    screenTitle: short(28),
    screenLines: z
      .array(short(40))
      .min(REPEATABLE_LIMITS["phone-mock"].min)
      .max(REPEATABLE_LIMITS["phone-mock"].max),
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["phone-mock"]),
});

export const ctaSlideSchema = z.object({
  template: z.literal("cta"),
  variant: ctaVariant.optional(),
  data: z.object({
    headline: short(64),
    prompt: optionalShort(80),
    cta: short(40),
    icon: optionalIcon,
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS.cta),
});

export const vsSplitSlideSchema = z.object({
  template: z.literal("vs-split"),
  variant: vsSplitVariant.optional(),
  data: z.object({
    headline: short(48),
    leftLabel: short(20),
    rightLabel: short(20),
    leftTone: itemToneSchema.optional(),
    rightTone: itemToneSchema.optional(),
    rows: z
      .array(
        z.object({
          topic: short(24),
          left: short(48),
          right: short(48),
          icon: iconIdSchema,
        }),
      )
      .min(REPEATABLE_LIMITS["vs-split"].min)
      .max(REPEATABLE_LIMITS["vs-split"].max),
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["vs-split"]),
});

export const ribbonStepsSlideSchema = z.object({
  template: z.literal("ribbon-steps"),
  variant: ribbonStepsVariant.optional(),
  data: z.object({
    headline: short(48),
    steps: z
      .array(
        z.object({
          title: short(28),
          detail: optionalShort(56),
          icon: optionalIcon,
          tone: itemToneSchema.optional(),
        }),
      )
      .min(REPEATABLE_LIMITS["ribbon-steps"].min)
      .max(REPEATABLE_LIMITS["ribbon-steps"].max),
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["ribbon-steps"]),
});

export const iconRowsSlideSchema = z.object({
  template: z.literal("icon-rows"),
  variant: z.enum(TEMPLATE_VARIANTS["icon-rows"]).optional(),
  data: z.object({
    headline: short(48),
    rows: z
      .array(
        z.object({
          title: short(28),
          detail: optionalShort(56),
          icon: iconIdSchema,
          tone: itemToneSchema.optional(),
        }),
      )
      .min(REPEATABLE_LIMITS["icon-rows"].min)
      .max(REPEATABLE_LIMITS["icon-rows"].max),
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["icon-rows"]),
});

export const iconBentoSlideSchema = z.object({
  template: z.literal("icon-bento"),
  variant: iconBentoVariant.optional(),
  data: z.object({
    headline: short(48),
    subline: optionalShort(64),
    cells: z
      .array(
        z.object({
          label: short(24),
          detail: optionalShort(48),
          icon: iconIdSchema,
          tone: itemToneSchema.optional(),
        }),
      )
      .min(REPEATABLE_LIMITS["icon-bento"].min)
      .max(REPEATABLE_LIMITS["icon-bento"].max),
  }),
  layout: layoutSchemaForSlots(TEMPLATE_SLOTS["icon-bento"]),
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
  visual: episodeVisualSchema.optional(),
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
