import { NextResponse } from "next/server";
import { exportVersionToPdf } from "@/lib/infra/export";
import { z } from "zod";

const bodySchema = z.object({
  versionId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const { versionId } = bodySchema.parse(await request.json());
    const result = await exportVersionToPdf(versionId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error de export";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
