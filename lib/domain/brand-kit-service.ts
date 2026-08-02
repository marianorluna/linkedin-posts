import { prisma } from "@/lib/infra/prisma";
import { parseBrandTokens } from "@/lib/domain/post";
import {
  BRAND_PRESETS,
  deepMergeBrandTokens,
  type BrandTokens,
} from "@/lib/design-tokens";

export type BrandKitSummary = {
  id: string;
  name: string;
  tokens: BrandTokens;
};

export async function listBrandKits(): Promise<BrandKitSummary[]> {
  const kits = await prisma.brandKit.findMany({ orderBy: { createdAt: "asc" } });
  return kits.map((kit) => ({
    id: kit.id,
    name: kit.name,
    tokens: parseBrandTokens(kit.tokensJson),
  }));
}

export async function getBrandKit(id: string): Promise<BrandKitSummary | null> {
  const kit = await prisma.brandKit.findUnique({ where: { id } });
  if (!kit) return null;
  return {
    id: kit.id,
    name: kit.name,
    tokens: parseBrandTokens(kit.tokensJson),
  };
}

export async function updateBrandKitTokens(
  id: string,
  tokens: BrandTokens,
  name?: string,
): Promise<BrandKitSummary> {
  const merged = deepMergeBrandTokens(tokens);
  const kit = await prisma.brandKit.update({
    where: { id },
    data: {
      tokensJson: JSON.stringify(merged),
      ...(name !== undefined ? { name } : {}),
    },
  });
  return {
    id: kit.id,
    name: kit.name,
    tokens: parseBrandTokens(kit.tokensJson),
  };
}

export async function createBrandKitFromPreset(presetKey: string): Promise<BrandKitSummary> {
  const preset = BRAND_PRESETS[presetKey];
  if (!preset) {
    throw new Error(`Preset desconocido: ${presetKey}`);
  }
  const kit = await prisma.brandKit.create({
    data: {
      name: preset.name,
      tokensJson: JSON.stringify(preset.tokens),
    },
  });
  return {
    id: kit.id,
    name: kit.name,
    tokens: parseBrandTokens(kit.tokensJson),
  };
}

export async function applyPresetToBrandKit(
  id: string,
  presetKey: string,
): Promise<BrandKitSummary> {
  const preset = BRAND_PRESETS[presetKey];
  if (!preset) {
    throw new Error(`Preset desconocido: ${presetKey}`);
  }
  return updateBrandKitTokens(id, preset.tokens, preset.name);
}

export async function assignBrandKitToPost(postId: string, brandKitId: string) {
  const kit = await prisma.brandKit.findUnique({ where: { id: brandKitId } });
  if (!kit) throw new Error("BrandKit no encontrado");
  return prisma.post.update({
    where: { id: postId },
    data: { brandKitId },
  });
}

export function listPresetKeys(): Array<{ key: string; name: string }> {
  return Object.entries(BRAND_PRESETS).map(([key, value]) => ({
    key,
    name: value.name,
  }));
}

export async function resolveDefaultBrandKitId(): Promise<string> {
  const preferred = await prisma.brandKit.findFirst({
    where: { name: "Light Infographic" },
  });
  if (preferred) return preferred.id;

  const any = await prisma.brandKit.findFirst({ orderBy: { createdAt: "asc" } });
  if (!any) throw new Error("No hay BrandKit. Ejecuta pnpm db:seed");
  return any.id;
}
