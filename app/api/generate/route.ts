import { NextResponse } from "next/server";
import { generateCarouselFromBrief } from "@/lib/infra/llm";
import { z } from "zod";

const bodySchema = z.object({
  brief: z.string().min(3).max(500),
});

export async function POST(request: Request) {
  try {
    const { brief } = bodySchema.parse(await request.json());
    const result = await generateCarouselFromBrief(brief);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error de generación";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
