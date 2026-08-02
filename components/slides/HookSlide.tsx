import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = { tokens: BrandTokens; data: Extract<SlideContent, { template: "hook" }>["data"] };

export function HookSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="flex h-full flex-col justify-between">
        <div>
          {data.eyebrow ? <SlideEyebrow>{data.eyebrow}</SlideEyebrow> : null}
          <SlideHeadline>{data.headline}</SlideHeadline>
          {data.subline ? <SlideBody>{data.subline}</SlideBody> : null}
        </div>
        <div className="flex items-end justify-between">
          <div
            className="h-[6px] w-[180px] rounded-full"
            style={{ background: "var(--slide-accent)" }}
          />
          <div
            className="h-[220px] w-[220px] rounded-full border"
            style={{
              borderColor: "var(--slide-stroke)",
              borderWidth: "var(--slide-stroke-width)",
              background:
                "radial-gradient(circle at 35% 35%, var(--slide-accent-soft), transparent 60%)",
            }}
          />
        </div>
      </div>
    </SlideFrame>
  );
}
