import type { BrandTokens } from "@/lib/design-tokens";
import { listDensity } from "@/lib/domain/repeatable-items";
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
  const dens = listDensity(data.steps.length);
  return (
    <SlideFrame tokens={tokens}>
      <SlideEyebrow>Proceso</SlideEyebrow>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <SlideHeadline>{data.headline}</SlideHeadline>
      </LayoutSlot>
      <LayoutSlot
        id="list"
        layout={getSlot(layout, "list")}
        className="flex flex-1 flex-col justify-center"
        style={{ marginTop: dens.mtPx }}
      >
        <ol className="flex flex-col" style={{ gap: dens.gapPx }}>
          {data.steps.map((step, index) => (
            <li key={`${step.title}-${index}`} className="flex items-start gap-7">
              {step.icon ? (
                <span
                  className="flex shrink-0 items-center justify-center rounded-full"
                  style={{
                    height: dens.badgePx,
                    width: dens.badgePx,
                    border: "var(--slide-stroke-width) solid var(--slide-stroke)",
                    color: "var(--slide-accent)",
                    background: "var(--slide-accent-soft)",
                  }}
                >
                  <SlideIcon id={step.icon} size={Math.round(dens.iconPx * 0.7)} />
                </span>
              ) : (
                <span
                  className="flex shrink-0 items-center justify-center rounded-full font-[family-name:var(--slide-font-mono)]"
                  style={{
                    height: dens.badgePx,
                    width: dens.badgePx,
                    fontSize: Math.round(dens.titlePx * 0.65),
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
                  className="slot-text font-[family-name:var(--slide-font-display)] tracking-tight"
                  style={{ color: "var(--slide-ink)", fontSize: dens.titlePx }}
                >
                  {step.title}
                </p>
                {step.detail ? (
                  <p
                    className="slot-text mt-2 font-[family-name:var(--slide-font-body)]"
                    style={{ color: "var(--slide-ink-muted)", fontSize: dens.detailPx }}
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
