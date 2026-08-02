import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { NumberBadge } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "ribbon-steps" }>["data"];
  layout?: Extract<SlideContent, { template: "ribbon-steps" }>["layout"];
};

const tones = [
  "var(--slide-accent)",
  "var(--slide-highlight)",
  "var(--slide-accent-alt)",
  "var(--slide-surface)",
] as const;

export function RibbonStepsSlide({ tokens, data, layout }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <p
        className="mb-3 font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.16em] uppercase"
        style={{ color: "var(--slide-accent)" }}
      >
        Proceso
      </p>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text font-[family-name:var(--slide-font-display)] text-[52px] font-extrabold tracking-tight"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <LayoutSlot id="steps" layout={getSlot(layout, "steps")} className="mt-12 flex flex-1 flex-col justify-center gap-5">
        {data.steps.map((step, index) => {
          const tone = tones[index % tones.length];
          const darkText = tone === "var(--slide-surface)";
          return (
            <div
              key={`${step.title}-${index}`}
              className="relative flex items-center gap-5 rounded-[999px] py-4 pl-4 pr-8 shadow-[0_12px_0_rgba(0,0,0,0.08)]"
              style={{ background: tone }}
            >
              <NumberBadge n={index + 1} size={72} tone="surface" />
              <div className="min-w-0 flex-1">
                <p
                  className="slot-text truncate font-[family-name:var(--slide-font-display)] text-[32px] font-extrabold uppercase tracking-wide"
                  style={{ color: darkText ? "var(--slide-ink)" : "var(--slide-bg)" }}
                >
                  {step.title}
                </p>
                {step.detail ? (
                  <p
                    className="slot-text mt-0.5 font-[family-name:var(--slide-font-body)] text-[22px]"
                    style={{
                      color: darkText
                        ? "var(--slide-ink-muted)"
                        : "color-mix(in srgb, var(--slide-bg) 88%, transparent)",
                    }}
                  >
                    {step.detail}
                  </p>
                ) : null}
              </div>
              {step.icon ? (
                <span style={{ color: darkText ? "var(--slide-ink)" : "var(--slide-bg)" }}>
                  <SlideIcon id={step.icon} size={44} />
                </span>
              ) : null}
            </div>
          );
        })}
      </LayoutSlot>
    </SlideFrame>
  );
}
