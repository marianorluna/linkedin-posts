import { StudioEditor } from "@/components/studio/StudioEditor";
import { defaultBrandTokens } from "@/lib/design-tokens";
import { sampleCarousel } from "@/lib/schemas/carousel";

export default function NewPostPage() {
  return (
    <StudioEditor
      mode="create"
      initialContent={sampleCarousel}
      tokens={defaultBrandTokens}
    />
  );
}
