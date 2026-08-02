import type { BrandTokens } from "@/lib/design-tokens";
import { listDensity } from "@/lib/domain/repeatable-items";
import { resolveItemTone } from "@/lib/domain/item-tone";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { ITEM_TONE_CYCLES } from "@/lib/schemas/item-tone";
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

function RibbonDiagonal({ data, layout }: Omit<Props, "tokens" | "variant">) {
  const dens = listDensity(data.steps.length);
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
          className="slot-text font-[family-name:var(--slide-font-display)] font-extrabold tracking-tight"
          style={{
            color: "var(--slide-ink)",
            fontSize: data.steps.length >= 7 ? 36 : data.steps.length >= 5 ? 44 : 52,
          }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <LayoutSlot
        id="steps"
        layout={getSlot(layout, "steps")}
        className="flex flex-1 flex-col justify-center"
        style={{ marginTop: dens.mtPx, gap: dens.gapPx }}
      >
        {data.steps.map((step, index) => {
          const { cssVar, inkOnTone } = resolveItemTone(step.tone, index, ITEM_TONE_CYCLES.ribbon);
          const darkText = inkOnTone === "ink";
          return (
            <div
              key={`${step.title}-${index}`}
              className="relative flex items-center gap-5 rounded-[999px] pl-4 pr-8 shadow-[0_12px_0_rgba(0,0,0,0.08)]"
              style={{
                background: cssVar,
                paddingTop: dens.padYPx,
                paddingBottom: dens.padYPx,
                transform: `translateX(${index % 2 === 0 ? 0 : Math.max(8, 24 - data.steps.length)}px)`,
              }}
            >
              <NumberBadge n={index + 1} size={dens.badgePx} tone="surface" />
              <div className="min-w-0 flex-1">
                <p
                  className="slot-text truncate font-[family-name:var(--slide-font-display)] font-extrabold uppercase tracking-wide"
                  style={{
                    color: darkText ? "var(--slide-ink)" : "var(--slide-bg)",
                    fontSize: dens.titlePx,
                  }}
                >
                  {step.title}
                </p>
                {step.detail ? (
                  <p
                    className="slot-text mt-0.5 font-[family-name:var(--slide-font-body)]"
                    style={{
                      fontSize: dens.detailPx,
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
                  <SlideIcon id={step.icon} size={dens.iconPx} />
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
  const dens = listDensity(data.steps.length);
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
          className="slot-text font-[family-name:var(--slide-font-display)] font-extrabold tracking-tight"
          style={{
            color: "var(--slide-ink)",
            fontSize: data.steps.length >= 7 ? 36 : data.steps.length >= 5 ? 44 : 52,
          }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <LayoutSlot
        id="steps"
        layout={getSlot(layout, "steps")}
        className="flex flex-1 gap-6"
        style={{ marginTop: dens.mtPx }}
      >
        <div className="relative flex w-16 flex-col items-center py-2">
          <div
            className="absolute bottom-6 top-6 w-1 rounded-full"
            style={{ background: "var(--slide-stroke)" }}
          />
          {data.steps.map((_, index) => (
            <div key={`rail-${index}`} className="relative z-10 flex flex-1 items-center">
              <NumberBadge n={index + 1} size={Math.round(dens.badgePx * 0.82)} tone="accent" />
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-evenly" style={{ gap: dens.gapPx }}>
          {data.steps.map((step, index) => {
            const { cssVar } = resolveItemTone(step.tone, index, ITEM_TONE_CYCLES.ribbon);
            return (
              <div
                key={`${step.title}-${index}`}
                className="flex items-center gap-5 rounded-[24px] px-6 shadow-[0_10px_0_rgba(0,0,0,0.06)]"
                style={{
                  background: "var(--slide-bg-elevated)",
                  borderLeft: `8px solid ${cssVar}`,
                  paddingTop: dens.padYPx + 4,
                  paddingBottom: dens.padYPx + 4,
                }}
              >
                <div className="min-w-0 flex-1">
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] font-extrabold tracking-tight"
                    style={{ color: "var(--slide-ink)", fontSize: dens.titlePx }}
                  >
                    {step.title}
                  </p>
                  {step.detail ? (
                    <p
                      className="slot-text mt-1 font-[family-name:var(--slide-font-body)]"
                      style={{ color: "var(--slide-ink-muted)", fontSize: dens.detailPx }}
                    >
                      {step.detail}
                    </p>
                  ) : null}
                </div>
                {step.icon ? (
                  <span style={{ color: "var(--slide-ink)" }}>
                    <SlideIcon id={step.icon} size={dens.iconPx} />
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
