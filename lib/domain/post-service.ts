import { prisma } from "@/lib/infra/prisma";
import {
  assertPostStatus,
  parseBrandTokens,
  parseContentJson,
  parseTags,
} from "@/lib/domain/post";
import type { CarouselContent } from "@/lib/schemas/carousel";
import { carouselSchema } from "@/lib/schemas/carousel";

export async function listPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      versions: { orderBy: { createdAt: "desc" }, take: 1 },
      brandKit: true,
      _count: { select: { versions: true } },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    topic: post.topic,
    tags: parseTags(post.tags),
    status: assertPostStatus(post.status),
    updatedAt: post.updatedAt.toISOString(),
    versionCount: post._count.versions,
    latestVersionId: post.versions[0]?.id ?? null,
    slideCount: post.versions[0]
      ? parseContentJson(post.versions[0].contentJson).slides.length
      : 0,
  }));
}

export async function getPostDetail(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      brandKit: true,
      versions: {
        orderBy: { createdAt: "desc" },
        include: { assets: { orderBy: { createdAt: "desc" } } },
      },
    },
  });

  if (!post) return null;

  const latest = post.versions[0];
  return {
    id: post.id,
    title: post.title,
    topic: post.topic,
    tags: parseTags(post.tags),
    status: assertPostStatus(post.status),
    brandKit: {
      id: post.brandKit.id,
      name: post.brandKit.name,
      tokens: parseBrandTokens(post.brandKit.tokensJson),
    },
    versions: post.versions.map((v) => ({
      id: v.id,
      createdAt: v.createdAt.toISOString(),
      content: parseContentJson(v.contentJson),
      promptMeta: v.promptMeta,
      assets: v.assets.map((a) => ({
        id: a.id,
        format: a.format,
        path: a.path,
        width: a.width,
        height: a.height,
        createdAt: a.createdAt.toISOString(),
      })),
    })),
    latestVersionId: latest?.id ?? null,
    content: latest ? parseContentJson(latest.contentJson) : null,
  };
}

export async function createPost(input: {
  content: CarouselContent;
  status?: string;
  promptMeta?: unknown;
}) {
  const content = carouselSchema.parse(input.content);
  const brandKit = await prisma.brandKit.findFirst({ orderBy: { createdAt: "asc" } });
  if (!brandKit) {
    throw new Error("No hay BrandKit. Ejecuta pnpm db:seed");
  }

  return prisma.post.create({
    data: {
      title: content.title,
      topic: content.topic,
      tags: JSON.stringify(content.tags),
      status: input.status ?? "draft",
      brandKitId: brandKit.id,
      versions: {
        create: {
          contentJson: JSON.stringify(content),
          promptMeta: input.promptMeta ? JSON.stringify(input.promptMeta) : null,
        },
      },
    },
    include: { versions: true },
  });
}

export async function updatePostMeta(
  id: string,
  input: { title?: string; topic?: string; tags?: string[]; status?: string },
) {
  return prisma.post.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.topic !== undefined ? { topic: input.topic } : {}),
      ...(input.tags !== undefined ? { tags: JSON.stringify(input.tags) } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
    },
  });
}

export async function saveNewVersion(
  postId: string,
  content: CarouselContent,
  promptMeta?: unknown,
) {
  const parsed = carouselSchema.parse(content);
  await prisma.post.update({
    where: { id: postId },
    data: {
      title: parsed.title,
      topic: parsed.topic,
      tags: JSON.stringify(parsed.tags),
    },
  });

  return prisma.postVersion.create({
    data: {
      postId,
      contentJson: JSON.stringify(parsed),
      promptMeta: promptMeta ? JSON.stringify(promptMeta) : null,
    },
  });
}

export async function deletePost(id: string) {
  return prisma.post.delete({ where: { id } });
}

export async function getVersion(versionId: string) {
  const version = await prisma.postVersion.findUnique({
    where: { id: versionId },
    include: {
      post: { include: { brandKit: true } },
      assets: true,
    },
  });
  if (!version) return null;
  return {
    id: version.id,
    postId: version.postId,
    content: parseContentJson(version.contentJson),
    tokens: parseBrandTokens(version.post.brandKit.tokensJson),
    assets: version.assets,
  };
}
