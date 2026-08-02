import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { IconWell } from "./primitives";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "stat-hero" }>["data"];
};

export function StatHeroSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="flex items-start justify-between">
        <SlideEyebrow>Dato clave</SlideEyebrow>
        {data.icon ? (
          <IconWell size={80} tone="soft">
            <SlideIcon id={data.icon} size={40} />
          </IconWell>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <p
          className="font-[family-name:var(--slide-font-display)] text-[168px] leading-none tracking-[-0.05em]"
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
