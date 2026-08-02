import { NextResponse } from "next/server";
import {
  applyPresetToBrandKit,
  getBrandKit,
  updateBrandKitTokens,
} from "@/lib/domain/brand-kit-service";
import { deepMergeBrandTokens } from "@/lib/design-tokens";
import { z } from "zod";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const kit = await getBrandKit(id);
  if (!kit) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ kit });
}

const patchSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  tokens: z.unknown().optional(),
  presetKey: z.string().optional(),
});

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = patchSchema.parse(await request.json());

    if (body.presetKey) {
      const kit = await applyPresetToBrandKit(id, body.presetKey);
      return NextResponse.json({ kit });
    }

    if (body.tokens) {
      const tokens = deepMergeBrandTokens(body.tokens);
      const kit = await updateBrandKitTokens(id, tokens, body.name);
      return NextResponse.json({ kit });
    }

    if (body.name) {
      const current = await getBrandKit(id);
      if (!current) {
        return NextResponse.json({ error: "No encontrado" }, { status: 404 });
      }
      const kit = await updateBrandKitTokens(id, current.tokens, body.name);
      return NextResponse.json({ kit });
    }

    return NextResponse.json({ error: "Nada que actualizar" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
