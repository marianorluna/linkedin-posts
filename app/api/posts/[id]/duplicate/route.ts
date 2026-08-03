import { NextResponse } from "next/server";
import { duplicatePost, getPostDetail } from "@/lib/domain/post-service";

type Params = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const created = await duplicatePost(id);
    const post = await getPostDetail(created.id);
    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al duplicar";
    const status = message.includes("no encontrado") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
