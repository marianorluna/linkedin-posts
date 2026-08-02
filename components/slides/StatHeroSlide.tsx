import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "stat-hero" }>["data"];
};

export function StatHeroSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <SlideEyebrow>Dato clave</SlideEyebrow>
      <div className="flex flex-1 flex-col justify-center">
        <p
          className="font-[family-name:var(--font-display)] text-[168px] leading-none tracking-[-0.05em]"
          style={{ color: "var(--slide-accent)" }}
        >
          {data.value}
          {data.unit ? (
            <span
              className="ml-2 text-[56px] tracking-normal"
              style={{ color: "var(--slide-ink-muted)" }}
            >
              {data.unit}
            </span>
          ) : null}
        </p>
        <div className="mt-10">
          <SlideHeadline>{data.headline}</SlideHeadline>
          {data.detail ? <SlideBody>{data.detail}</SlideBody> : null}
        </div>
      </div>
    </SlideFrame>
  );
}
