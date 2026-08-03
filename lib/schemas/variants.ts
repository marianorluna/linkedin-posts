export const TEMPLATE_VARIANTS = {
  hook: ["split-icon", "centered", "type-dominant"],
  cta: ["centered", "bottom-bar", "question-big"],
  "stat-hero": ["stack", "watermark", "left-rail"],
  "vs-split": ["columns", "stacked-cards"],
  "ribbon-steps": ["diagonal", "numbered-rail"],
  "icon-bento": ["grid", "hero-cell"],
  "ab-compare": ["default"],
  steps: ["default"],
  "phone-mock": ["default", "laptop", "browser"],
  "icon-rows": ["default"],
} as const;

export type TemplateVariantsMap = typeof TEMPLATE_VARIANTS;
export type VariantTemplateSlug = keyof TemplateVariantsMap;
export type VariantsFor<T extends VariantTemplateSlug> = TemplateVariantsMap[T][number];
export type AnySlideVariant = VariantsFor<VariantTemplateSlug>;

export function defaultVariant<T extends VariantTemplateSlug>(slug: T): VariantsFor<T> {
  return TEMPLATE_VARIANTS[slug][0];
}

export function variantsFor(slug: VariantTemplateSlug): readonly string[] {
  return TEMPLATE_VARIANTS[slug];
}

export function resolveVariant<T extends VariantTemplateSlug>(
  slug: T,
  variant: string | undefined,
): VariantsFor<T> {
  const allowed = TEMPLATE_VARIANTS[slug] as readonly string[];
  if (variant && allowed.includes(variant)) {
    return variant as VariantsFor<T>;
  }
  return defaultVariant(slug);
}
