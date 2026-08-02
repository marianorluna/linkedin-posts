import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "steps" }>["data"];
  layout?: Extract<SlideContent, { template: "steps" }>["layout"];
};

export function StepsSlide({ tokens, data, layout }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <SlideEyebrow>Proceso</SlideEyebrow>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <SlideHeadline>{data.headline}</SlideHeadline>
      </LayoutSlot>
      <LayoutSlot
        id="list"
        layout={getSlot(layout, "list")}
        className="mt-16 flex flex-1 flex-col justify-center"
      >
        <ol className="flex flex-col gap-10">
          {data.steps.map((step, index) => (
            <li key={`${step.title}-${index}`} className="flex items-start gap-7">
              {step.icon ? (
                <span
                  className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full"
                  style={{
                    border: "var(--slide-stroke-width) solid var(--slide-stroke)",
                    color: "var(--slide-accent)",
                    background: "var(--slide-accent-soft)",
                  }}
                >
                  <SlideIcon id={step.icon} size={30} />
                </span>
              ) : (
                <span
                  className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full font-[family-name:var(--slide-font-mono)] text-[26px]"
                  style={{
                    border: "var(--slide-stroke-width) solid var(--slide-stroke)",
                    color: "var(--slide-accent)",
                    background: "var(--slide-accent-soft)",
                  }}
                >
                  {index + 1}
                </span>
              )}
              <div>
                <p
                  className="slot-text font-[family-name:var(--slide-font-display)] text-[40px] tracking-tight"
                  style={{ color: "var(--slide-ink)" }}
                >
                  {step.title}
                </p>
                {step.detail ? (
                  <p
                    className="slot-text mt-2 font-[family-name:var(--slide-font-body)] text-[24px]"
                    style={{ color: "var(--slide-ink-muted)" }}
                  >
                    {step.detail}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </LayoutSlot>
    </SlideFrame>
  );
}
