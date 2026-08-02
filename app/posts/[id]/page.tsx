import { notFound } from "next/navigation";
import { StudioEditor } from "@/components/studio/StudioEditor";
import { getPostDetail } from "@/lib/domain/post-service";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function PostEditorPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostDetail(id);
  if (!post || !post.content) notFound();

  const latestAssets = post.versions[0]?.assets ?? [];

  return (
    <StudioEditor
      mode="edit"
      postId={post.id}
      versionId={post.latestVersionId}
      initialContent={post.content}
      tokens={post.brandKit.tokens}
      status={post.status}
      assets={latestAssets}
    />
  );
}
