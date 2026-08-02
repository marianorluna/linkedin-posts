import { NextResponse } from "next/server";
import { createPost, listPosts } from "@/lib/domain/post-service";
import { carouselSchema } from "@/lib/schemas/carousel";
import { z } from "zod";

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ posts });
}

const createBodySchema = z.object({
  content: carouselSchema,
  status: z.enum(["draft", "ready", "archived"]).optional(),
  promptMeta: z.unknown().optional(),
  brandKitId: z.string().min(1).optional(),
});

export async function POST(request: Request) {
  try {
    const body = createBodySchema.parse(await request.json());
    const post = await createPost(body);
    return NextResponse.json({
      id: post.id,
      versionId: post.versions[0]?.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear post";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
