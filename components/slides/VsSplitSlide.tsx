import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "vs-split" }>["data"];
  layout?: Extract<SlideContent, { template: "vs-split" }>["layout"];
  variant?: VariantsFor<"vs-split">;
};

function VsColumns({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col px-10 pb-10 pt-10">
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")} className="mx-auto">
        <h1
          className="slot-text text-center font-[family-name:var(--slide-font-display)] text-[48px] font-extrabold tracking-tight"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <LayoutSlot id="panel" layout={getSlot(layout, "panel")} className="mt-8 flex flex-1">
        <div className="flex min-h-0 w-full flex-1 overflow-hidden rounded-[28px] shadow-[0_18px_0_rgba(0,0,0,0.08)]">
          <div
            className="flex w-[calc(50%-56px)] flex-col px-6 py-7"
            style={{ background: "var(--slide-accent)" }}
          >
            <LayoutSlot id="leftLabel" layout={getSlot(layout, "leftLabel")} className="mx-auto mb-6">
              <div
                className="rounded-full px-8 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-bold uppercase tracking-wide"
                style={{ background: "var(--slide-bg)", color: "var(--slide-accent)" }}
              >
                <span className="slot-text">{data.leftLabel}</span>
              </div>
            </LayoutSlot>
            <div className="flex flex-1 flex-col justify-evenly">
              {data.rows.map((row) => (
                <div
                  key={`L-${row.topic}`}
                  className="border-b border-dashed pb-4 text-right last:border-0"
                  style={{ borderColor: "color-mix(in srgb, var(--slide-bg) 35%, transparent)" }}
                >
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--slide-bg)" }}
                  >
                    {row.topic}
                  </p>
                  <p
                    className="slot-text mt-1 font-[family-name:var(--slide-font-body)] text-[24px] font-medium"
                    style={{ color: "color-mix(in srgb, var(--slide-bg) 92%, transparent)" }}
                  >
                    {row.left}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative z-10 flex w-[112px] shrink-0 flex-col items-center justify-center gap-6 px-2"
            style={{
              background: "var(--slide-bg-elevated)",
              boxShadow: "0 0 0 1px var(--slide-stroke)",
            }}
          >
            <span
              className="font-[family-name:var(--slide-font-display)] text-[40px] font-black leading-none"
              style={{
                color: "var(--slide-ink)",
                textShadow: "3px 3px 0 color-mix(in srgb, var(--slide-accent-alt) 55%, transparent)",
              }}
            >
              Vs
            </span>
            {data.rows.map((row) => (
              <div key={`I-${row.topic}`} className="flex flex-col items-center gap-1.5">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "var(--slide-surface)", color: "var(--slide-ink)" }}
                >
                  <SlideIcon id={row.icon} size={28} />
                </span>
                <span
                  className="max-w-[96px] text-center font-[family-name:var(--slide-font-mono)] text-[11px] tracking-[0.12em] uppercase"
                  style={{ color: "var(--slide-ink-muted)" }}
                >
                  {row.topic}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex w-[calc(50%-56px)] flex-col px-6 py-7"
            style={{ background: "var(--slide-accent-alt)" }}
          >
            <LayoutSlot id="rightLabel" layout={getSlot(layout, "rightLabel")} className="mx-auto mb-6">
              <div
                className="rounded-full px-8 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-bold uppercase tracking-wide"
                style={{ background: "var(--slide-bg)", color: "var(--slide-accent-alt)" }}
              >
                <span className="slot-text">{data.rightLabel}</span>
              </div>
            </LayoutSlot>
            <div className="flex flex-1 flex-col justify-evenly">
              {data.rows.map((row) => (
                <div
                  key={`R-${row.topic}`}
                  className="border-b border-dashed pb-4 text-left last:border-0"
                  style={{ borderColor: "color-mix(in srgb, var(--slide-bg) 35%, transparent)" }}
                >
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--slide-bg)" }}
                  >
                    {row.topic}
                  </p>
                  <p
                    className="slot-text mt-1 font-[family-name:var(--slide-font-body)] text-[24px] font-medium"
                    style={{ color: "color-mix(in srgb, var(--slide-bg) 92%, transparent)" }}
                  >
                    {row.right}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutSlot>
    </div>
  );
}

function VsStackedCards({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col px-10 pb-10 pt-10">
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text font-[family-name:var(--slide-font-display)] text-[48px] font-extrabold tracking-tight"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <div className="mt-6 flex items-center gap-4">
        <LayoutSlot id="leftLabel" layout={getSlot(layout, "leftLabel")}>
          <span
            className="slot-text rounded-full px-6 py-2 font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase"
            style={{ background: "var(--slide-accent)", color: "var(--slide-bg)" }}
          >
            {data.leftLabel}
          </span>
        </LayoutSlot>
        <span
          className="font-[family-name:var(--slide-font-display)] text-[28px] font-black"
          style={{ color: "var(--slide-ink-muted)" }}
        >
          vs
        </span>
        <LayoutSlot id="rightLabel" layout={getSlot(layout, "rightLabel")}>
          <span
            className="slot-text rounded-full px-6 py-2 font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase"
            style={{ background: "var(--slide-accent-alt)", color: "var(--slide-bg)" }}
          >
            {data.rightLabel}
          </span>
        </LayoutSlot>
      </div>

      <LayoutSlot id="panel" layout={getSlot(layout, "panel")} className="mt-8 flex flex-1 flex-col justify-center gap-4">
        {data.rows.map((row) => (
          <div
            key={row.topic}
            className="flex items-stretch overflow-hidden rounded-[24px] shadow-[0_12px_0_rgba(0,0,0,0.08)]"
            style={{ background: "var(--slide-bg-elevated)" }}
          >
            <div className="flex w-[38%] flex-col justify-center px-5 py-4" style={{ background: "var(--slide-accent)" }}>
              <p
                className="slot-text font-[family-name:var(--slide-font-body)] text-[22px] font-medium"
                style={{ color: "var(--slide-bg)" }}
              >
                {row.left}
              </p>
            </div>
            <div
              className="flex w-[24%] flex-col items-center justify-center gap-2 px-3 py-4"
              style={{ borderInline: "1px solid var(--slide-stroke)" }}
            >
              <span style={{ color: "var(--slide-ink)" }}>
                <SlideIcon id={row.icon} size={28} />
              </span>
              <span
                className="slot-text text-center font-[family-name:var(--slide-font-display)] text-[16px] font-bold uppercase tracking-wide"
                style={{ color: "var(--slide-ink)" }}
              >
                {row.topic}
              </span>
            </div>
            <div
              className="flex w-[38%] flex-col justify-center px-5 py-4"
              style={{ background: "var(--slide-accent-alt)" }}
            >
              <p
                className="slot-text font-[family-name:var(--slide-font-body)] text-[22px] font-medium"
                style={{ color: "var(--slide-bg)" }}
              >
                {row.right}
              </p>
            </div>
          </div>
        ))}
      </LayoutSlot>
    </div>
  );
}

export function VsSplitSlide({ tokens, data, layout, variant = "columns" }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      {variant === "stacked-cards" ? (
        <VsStackedCards data={data} layout={layout} />
      ) : (
        <VsColumns data={data} layout={layout} />
      )}
    </SlideFrame>
  );
}
