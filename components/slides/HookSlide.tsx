import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { PillLabel } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "hook" }>["data"];
  layout?: Extract<SlideContent, { template: "hook" }>["layout"];
};

export function HookSlide({ tokens, data, layout }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      <div className="relative h-full">
        <div
          className="pointer-events-none absolute -right-24 top-16 h-[520px] w-[520px] rounded-full"
          style={{
            background: "color-mix(in srgb, var(--slide-accent) 16%, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full"
          style={{
            background: "color-mix(in srgb, var(--slide-accent-alt) 12%, transparent)",
          }}
        />

        <div className="relative z-10 flex h-full">
          <div className="relative flex w-[56%] flex-col justify-between p-[72px] pr-8">
            <div className="relative min-h-[200px]">
              {data.eyebrow ? (
                <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")} className="mb-6 inline-flex">
                  <PillLabel tone="accent">
                    <span className="slot-text">{data.eyebrow}</span>
                  </PillLabel>
                </LayoutSlot>
              ) : null}
              <LayoutSlot id="headline" layout={getSlot(layout, "headline")} className="mt-2 block">
                <h1
                  className="slot-text font-[family-name:var(--slide-font-display)] text-[68px] font-extrabold leading-[1.05] tracking-[-0.03em]"
                  style={{ color: "var(--slide-ink)" }}
                >
                  {data.headline}
                </h1>
              </LayoutSlot>
              {data.subline ? (
                <LayoutSlot id="subline" layout={getSlot(layout, "subline")} className="mt-7 block max-w-[480px]">
                  <p
                    className="slot-text font-[family-name:var(--slide-font-body)] text-[30px] leading-[1.35]"
                    style={{ color: "var(--slide-ink-muted)" }}
                  >
                    {data.subline}
                  </p>
                </LayoutSlot>
              ) : null}
            </div>
            <div className="flex items-center gap-4">
              <div
                className="h-[10px] w-[120px] rounded-full"
                style={{ background: "var(--slide-accent)" }}
              />
              <div
                className="h-[10px] w-[48px] rounded-full"
                style={{ background: "var(--slide-accent-alt)" }}
              />
              <div
                className="h-[10px] w-[24px] rounded-full"
                style={{ background: "var(--slide-highlight)" }}
              />
            </div>
          </div>

          <div className="relative z-10 flex w-[44%] items-center justify-center pr-12">
            <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
              <div
                className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full"
                style={{
                  background: "var(--slide-bg-elevated)",
                  boxShadow:
                    "0 24px 0 color-mix(in srgb, var(--slide-ink) 8%, transparent), inset 0 0 0 2px var(--slide-stroke)",
                }}
              >
                <div
                  className="absolute inset-8 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, var(--slide-accent-soft), transparent 65%)",
                    border: "2px dashed color-mix(in srgb, var(--slide-accent) 35%, transparent)",
                  }}
                />
                {data.icon ? (
                  <span style={{ color: "var(--slide-ink)" }}>
                    <SlideIcon id={data.icon} size={160} />
                  </span>
                ) : (
                  <div
                    className="h-[180px] w-[180px] rounded-full"
                    style={{ background: "var(--slide-accent-soft)" }}
                  />
                )}
              </div>
            </LayoutSlot>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
