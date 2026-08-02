import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "cta" }>["data"];
};

export function CtaSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <SlideEyebrow>Cierre</SlideEyebrow>
          <SlideHeadline>{data.headline}</SlideHeadline>
          {data.prompt ? <SlideBody>{data.prompt}</SlideBody> : null}
        </div>
        <div
          className="inline-flex w-fit items-center rounded-full px-10 py-5 font-[family-name:var(--font-display)] text-[32px]"
          style={{
            background: "var(--slide-accent)",
            color: "var(--slide-bg)",
          }}
        >
          {data.cta}
        </div>
      </div>
    </SlideFrame>
  );
}
