import type { BrandTokens } from "@/lib/design-tokens";
import { defaultBrandTokens } from "@/lib/design-tokens";
import type { CarouselContent } from "@/lib/schemas/carousel";
import { carouselSchema } from "@/lib/schemas/carousel";

export type PostStatus = "draft" | "ready" | "archived";

export function parseTags(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
  } catch {
    return [];
  }
}

export function parseContentJson(raw: string): CarouselContent {
  return carouselSchema.parse(JSON.parse(raw));
}

export function parseBrandTokens(raw: string): BrandTokens {
  try {
    return { ...defaultBrandTokens, ...(JSON.parse(raw) as BrandTokens) };
  } catch {
    return defaultBrandTokens;
  }
}

export function assertPostStatus(value: string): PostStatus {
  if (value === "draft" || value === "ready" || value === "archived") {
    return value;
  }
  return "draft";
}
