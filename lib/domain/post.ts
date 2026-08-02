import type { BrandTokens } from "@/lib/design-tokens";
import { deepMergeBrandTokens } from "@/lib/design-tokens";
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
    return deepMergeBrandTokens(JSON.parse(raw) as unknown);
  } catch {
    return deepMergeBrandTokens(null);
  }
}

export function assertPostStatus(value: string): PostStatus {
  if (value === "draft" || value === "ready" || value === "archived") {
    return value;
  }
  return "draft";
}
