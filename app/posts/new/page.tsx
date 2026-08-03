import { StudioEditor } from "@/components/studio/StudioEditor";
import { BRAND_PRESETS } from "@/lib/design-tokens";
import { sampleCarousel } from "@/lib/schemas/seed-carousels";

export default function NewPostPage() {
  const defaultTokens = BRAND_PRESETS["light-infographic"].tokens;

  return (
    <StudioEditor
      mode="create"
      initialContent={sampleCarousel}
      tokens={defaultTokens}
    />
  );
}
