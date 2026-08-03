import { prisma } from "@/lib/infra/prisma";
import { resolveDefaultBrandKitId } from "@/lib/domain/brand-kit-service";
import { resolveEpisodeTokens } from "@/lib/domain/episode-visual";
import {
  assertPostOrigin,
  assertPostStatus,
  HOME_PAGE_SIZE,
  parseBrandTokens,
  parseContentJson,
  parseTags,
  type PostOrigin,
  type PostOriginFilter,
} from "@/lib/domain/post";
import type { CarouselContent, SlideContent } from "@/lib/schemas/carousel";
import { carouselSchema } from "@/lib/schemas/carousel";
import type { BrandTokens } from "@/lib/design-tokens";
import type { Contrast, Motif } from "@/lib/schemas/episode-visual";

export type PostListPreview = {
  slide: SlideContent;
  tokens: BrandTokens;
  motif: Motif;
  contrast: Contrast;
  legacyMoodDecor: boolean;
};

function mapPostListItem(post: {
  id: string;
  title: string;
  topic: string;
  tags: string;
  status: string;
  origin: string;
  updatedAt: Date;
  createdAt: Date;
  brandKit: { tokensJson: string };
  versions: { id: string; contentJson: string }[];
  _count: { versions: number };
}) {
  const latest = post.versions[0];
  let slideCount = 0;
  let preview: PostListPreview | null = null;

  if (latest) {
    const content = parseContentJson(latest.contentJson);
    slideCount = content.slides.length;
    const first = content.slides[0];
    if (first) {
      const episode = resolveEpisodeTokens(
        parseBrandTokens(post.brandKit.tokensJson),
        content.visual,
      );
      preview = {
        slide: first,
        tokens: episode.tokens,
        motif: episode.motif,
        contrast: episode.contrast,
        legacyMoodDecor: episode.legacyMoodDecor,
      };
    }
  }

  return {
    id: post.id,
    title: post.title,
    topic: post.topic,
    tags: parseTags(post.tags),
    status: assertPostStatus(post.status),
    origin: assertPostOrigin(post.origin),
    updatedAt: post.updatedAt.toISOString(),
    createdAt: post.createdAt.toISOString(),
    versionCount: post._count.versions,
    latestVersionId: latest?.id ?? null,
    slideCount,
    preview,
  };
}

const listInclude = {
  versions: { orderBy: { createdAt: "desc" as const }, take: 1 },
  brandKit: true,
  _count: { select: { versions: true } },
};

/** Prefer listPostsPage for filtered/paginated home. */
export async function listPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: listInclude,
  });
  return posts.map(mapPostListItem);
}

export async function listPostsPage(
  input: {
    origin?: PostOriginFilter;
    page?: number;
    pageSize?: number;
  } = {},
) {
  const origin = input.origin ?? "all";
  const pageSize = Math.max(1, input.pageSize ?? HOME_PAGE_SIZE);
  const page = Math.max(1, input.page ?? 1);
  const where = origin === "all" ? {} : { origin };

  const total = await prisma.post.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (safePage - 1) * pageSize,
    take: pageSize,
    include: listInclude,
  });

  return {
    items: posts.map(mapPostListItem),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
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
    origin: assertPostOrigin(post.origin),
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
  brandKitId?: string;
  origin?: PostOrigin;
}) {
  const content = carouselSchema.parse(input.content);
  const brandKitId = input.brandKitId ?? (await resolveDefaultBrandKitId());

  return prisma.post.create({
    data: {
      title: content.title,
      topic: content.topic,
      tags: JSON.stringify(content.tags),
      status: input.status ?? "draft",
      origin: input.origin ?? "user",
      brandKitId,
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
  input: {
    title?: string;
    topic?: string;
    tags?: string[];
    status?: string;
    brandKitId?: string;
  },
) {
  return prisma.post.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.topic !== undefined ? { topic: input.topic } : {}),
      ...(input.tags !== undefined ? { tags: JSON.stringify(input.tags) } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.brandKitId !== undefined ? { brandKitId: input.brandKitId } : {}),
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

const TITLE_MAX = 80;

export async function duplicatePost(id: string) {
  const source = await prisma.post.findUnique({
    where: { id },
    include: {
      versions: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  if (!source) {
    throw new Error("Post no encontrado");
  }

  const latest = source.versions[0];
  if (!latest) {
    throw new Error("El post no tiene versiones");
  }

  const content = carouselSchema.parse(parseContentJson(latest.contentJson));
  const copySuffix = " (copia)";
  const baseMax = TITLE_MAX - copySuffix.length;
  const baseTitle = content.title.slice(0, Math.max(1, baseMax));
  const duplicated: CarouselContent = {
    ...content,
    title: `${baseTitle}${copySuffix}`,
  };

  return createPost({
    content: duplicated,
    status: "draft",
    brandKitId: source.brandKitId,
    origin: "user",
    promptMeta: { source: "duplicate", fromPostId: id },
  });
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
