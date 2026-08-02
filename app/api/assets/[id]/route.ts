import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/infra/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const asset = await prisma.exportAsset.findUnique({ where: { id } });
  if (!asset) {
    return NextResponse.json({ error: "Asset no encontrado" }, { status: 404 });
  }

  const exportsRoot = path.join(/*turbopackIgnore: true*/ process.cwd(), "storage", "exports");
  const absolute = path.resolve(/*turbopackIgnore: true*/ process.cwd(), asset.path);
  if (!absolute.startsWith(exportsRoot)) {
    return NextResponse.json({ error: "Ruta no permitida" }, { status: 400 });
  }

  const bytes = await readFile(absolute);
  const contentType = asset.format === "pdf" ? "application/pdf" : "image/png";
  const filename = path.basename(asset.path);

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
