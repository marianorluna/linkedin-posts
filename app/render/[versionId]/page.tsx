import { defaultBrandTokens } from "@/lib/design-tokens";
import { resolveEpisodeTokens } from "@/lib/domain/episode-visual";
import { getVersion } from "@/lib/domain/post-service";
import { SlideRenderer } from "@/components/slides/SlideRenderer";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ versionId: string }>;
  searchParams: Promise<{ slide?: string }>;
};

export default async function RenderPage({ params, searchParams }: Props) {
  const { versionId } = await params;
  const { slide: slideParam } = await searchParams;
  const version = await getVersion(versionId);
  if (!version) notFound();

  const index = Math.max(0, Number(slideParam ?? "0") || 0);
  const slide = version.content.slides[index];
  if (!slide) notFound();

  const episode = resolveEpisodeTokens(
    version.tokens ?? defaultBrandTokens,
    version.content.visual,
  );

  return (
    <div className="m-0 flex h-[1080px] w-[1080px] items-start justify-start overflow-hidden bg-black p-0">
      <SlideRenderer
        slide={slide}
        tokens={episode.tokens}
        motif={episode.motif}
        contrast={episode.contrast}
        legacyMoodDecor={episode.legacyMoodDecor}
      />
    </div>
  );
}
