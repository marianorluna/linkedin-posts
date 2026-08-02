import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { NumberBadge } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "ribbon-steps" }>["data"];
  layout?: Extract<SlideContent, { template: "ribbon-steps" }>["layout"];
  variant?: VariantsFor<"ribbon-steps">;
};

const tones = [
  "var(--slide-accent)",
  "var(--slide-highlight)",
  "var(--slide-accent-alt)",
  "var(--slide-surface)",
] as const;

function RibbonDiagonal({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <>
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

      <LayoutSlot
        id="steps"
        layout={getSlot(layout, "steps")}
        className="mt-12 flex flex-1 flex-col justify-center gap-5"
      >
        {data.steps.map((step, index) => {
          const tone = tones[index % tones.length];
          const darkText = tone === "var(--slide-surface)";
          return (
            <div
              key={`${step.title}-${index}`}
              className="relative flex items-center gap-5 rounded-[999px] py-4 pl-4 pr-8 shadow-[0_12px_0_rgba(0,0,0,0.08)]"
              style={{
                background: tone,
                transform: `translateX(${index % 2 === 0 ? 0 : 24}px)`,
              }}
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
    </>
  );
}

function RibbonNumberedRail({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <>
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

      <LayoutSlot
        id="steps"
        layout={getSlot(layout, "steps")}
        className="mt-10 flex flex-1 gap-6"
      >
        <div className="relative flex w-16 flex-col items-center py-2">
          <div
            className="absolute bottom-6 top-6 w-1 rounded-full"
            style={{ background: "var(--slide-stroke)" }}
          />
          {data.steps.map((_, index) => (
            <div key={`rail-${index}`} className="relative z-10 flex flex-1 items-center">
              <NumberBadge n={index + 1} size={56} tone="accent" />
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-evenly gap-4">
          {data.steps.map((step, index) => {
            const tone = tones[index % tones.length];
            return (
              <div
                key={`${step.title}-${index}`}
                className="flex items-center gap-5 rounded-[24px] px-6 py-5 shadow-[0_10px_0_rgba(0,0,0,0.06)]"
                style={{ background: "var(--slide-bg-elevated)", borderLeft: `8px solid ${tone}` }}
              >
                <div className="min-w-0 flex-1">
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] text-[30px] font-extrabold tracking-tight"
                    style={{ color: "var(--slide-ink)" }}
                  >
                    {step.title}
                  </p>
                  {step.detail ? (
                    <p
                      className="slot-text mt-1 font-[family-name:var(--slide-font-body)] text-[22px]"
                      style={{ color: "var(--slide-ink-muted)" }}
                    >
                      {step.detail}
                    </p>
                  ) : null}
                </div>
                {step.icon ? (
                  <span style={{ color: "var(--slide-ink)" }}>
                    <SlideIcon id={step.icon} size={40} />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </LayoutSlot>
    </>
  );
}

export function RibbonStepsSlide({ tokens, data, layout, variant = "diagonal" }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      {variant === "numbered-rail" ? (
        <RibbonNumberedRail data={data} layout={layout} />
      ) : (
        <RibbonDiagonal data={data} layout={layout} />
      )}
    </SlideFrame>
  );
}
