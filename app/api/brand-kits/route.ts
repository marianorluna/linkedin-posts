import { NextResponse } from "next/server";
import {
  createBrandKitFromPreset,
  listBrandKits,
  listPresetKeys,
} from "@/lib/domain/brand-kit-service";
import { z } from "zod";

export async function GET() {
  const kits = await listBrandKits();
  return NextResponse.json({ kits, presets: listPresetKeys() });
}

const createSchema = z.object({
  presetKey: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = createSchema.parse(await request.json());
    const kit = await createBrandKitFromPreset(body.presetKey);
    return NextResponse.json({ kit });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear BrandKit";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
