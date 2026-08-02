import { defaultBrandTokens } from "@/lib/design-tokens";
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

  return (
    <div className="m-0 flex h-[1080px] w-[1080px] items-start justify-start overflow-hidden bg-black p-0">
      <SlideRenderer slide={slide} tokens={version.tokens ?? defaultBrandTokens} />
    </div>
  );
}
