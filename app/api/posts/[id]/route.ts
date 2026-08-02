import { NextResponse } from "next/server";
import {
  deletePost,
  getPostDetail,
  saveNewVersion,
  updatePostMeta,
} from "@/lib/domain/post-service";
import { carouselSchema } from "@/lib/schemas/carousel";
import { z } from "zod";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const post = await getPostDetail(id);
  if (!post) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

const patchSchema = z.object({
  title: z.string().min(1).max(80).optional(),
  topic: z.string().min(1).max(120).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "ready", "archived"]).optional(),
  content: carouselSchema.optional(),
  promptMeta: z.unknown().optional(),
  brandKitId: z.string().min(1).optional(),
});

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = patchSchema.parse(await request.json());
    await updatePostMeta(id, body);
    let versionId: string | undefined;
    if (body.content) {
      const version = await saveNewVersion(id, body.content, body.promptMeta);
      versionId = version.id;
    }
    const post = await getPostDetail(id);
    return NextResponse.json({ post, versionId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
