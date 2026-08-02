import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { IconWell } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "stat-hero" }>["data"];
  layout?: Extract<SlideContent, { template: "stat-hero" }>["layout"];
};

export function StatHeroSlide({ tokens, data, layout }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="flex items-start justify-between">
        <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
          <SlideEyebrow>Dato clave</SlideEyebrow>
        </LayoutSlot>
        {data.icon ? (
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
            <IconWell size={80} tone="soft">
              <SlideIcon id={data.icon} size={40} />
            </IconWell>
          </LayoutSlot>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <LayoutSlot id="value" layout={getSlot(layout, "value")}>
          <p
            className="slot-text font-[family-name:var(--slide-font-display)] text-[168px] leading-none tracking-[-0.05em]"
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
        </LayoutSlot>
        <div className="mt-10">
          <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
            <SlideHeadline>{data.headline}</SlideHeadline>
          </LayoutSlot>
          {data.detail ? (
            <LayoutSlot id="detail" layout={getSlot(layout, "detail")}>
              <SlideBody>{data.detail}</SlideBody>
            </LayoutSlot>
          ) : null}
        </div>
      </div>
    </SlideFrame>
  );
}
