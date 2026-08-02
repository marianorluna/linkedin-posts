import type { BrandTokens } from "@/lib/design-tokens";
import { listDensity } from "@/lib/domain/repeatable-items";
import { resolveItemTone } from "@/lib/domain/item-tone";
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

function sideTone(
  tone: Props["data"]["leftTone"],
  fallback: "accent" | "accentAlt",
) {
  return resolveItemTone(tone ?? fallback, 0, [fallback]);
}

function sideTextColor(inkOnTone: "bg" | "ink") {
  return inkOnTone === "ink" ? "var(--slide-ink)" : "var(--slide-bg)";
}

function sideMutedColor(inkOnTone: "bg" | "ink") {
  return inkOnTone === "ink"
    ? "var(--slide-ink-muted)"
    : "color-mix(in srgb, var(--slide-bg) 92%, transparent)";
}

function VsColumns({ data, layout }: Omit<Props, "tokens" | "variant">) {
  const left = sideTone(data.leftTone, "accent");
  const right = sideTone(data.rightTone, "accentAlt");
  const dens = listDensity(data.rows.length);
  const topicPx = Math.max(16, dens.titlePx - 8);
  const bodyPx = dens.detailPx;
  const iconBox = Math.max(40, dens.badgePx - 12);
  const iconSize = Math.max(20, dens.iconPx - 8);

  return (
    <div className="relative flex h-full flex-col px-10 pb-10 pt-10">
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")} className="mx-auto">
        <h1
          className="slot-text text-center font-[family-name:var(--slide-font-display)] font-extrabold tracking-tight"
          style={{
            color: "var(--slide-ink)",
            fontSize: data.rows.length >= 4 ? 40 : 48,
          }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <LayoutSlot id="panel" layout={getSlot(layout, "panel")} className="mt-8 flex flex-1">
        <div className="flex min-h-0 w-full flex-1 overflow-hidden rounded-[28px] shadow-[0_18px_0_rgba(0,0,0,0.08)]">
          <div
            className="flex w-[calc(50%-56px)] flex-col px-6 py-7"
            style={{ background: left.cssVar }}
          >
            <LayoutSlot id="leftLabel" layout={getSlot(layout, "leftLabel")} className="mx-auto mb-6">
              <div
                className="rounded-full px-8 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-bold uppercase tracking-wide"
                style={{ background: "var(--slide-bg)", color: left.cssVar }}
              >
                <span className="slot-text">{data.leftLabel}</span>
              </div>
            </LayoutSlot>
            <div className="flex flex-1 flex-col justify-evenly">
              {data.rows.map((row, i) => (
                <div
                  key={`L-${row.topic}-${i}`}
                  className="border-b border-dashed pb-4 text-right last:border-0"
                  style={{
                    borderColor:
                      left.inkOnTone === "ink"
                        ? "color-mix(in srgb, var(--slide-ink) 25%, transparent)"
                        : "color-mix(in srgb, var(--slide-bg) 35%, transparent)",
                  }}
                >
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] font-bold uppercase tracking-wide"
                    style={{ color: sideTextColor(left.inkOnTone), fontSize: topicPx }}
                  >
                    {row.topic}
                  </p>
                  <p
                    className="slot-text mt-1 font-[family-name:var(--slide-font-body)] font-medium"
                    style={{ color: sideMutedColor(left.inkOnTone), fontSize: bodyPx }}
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
              gap: dens.gapPx,
            }}
          >
            <span
              className="font-[family-name:var(--slide-font-display)] text-[40px] font-black leading-none"
              style={{
                color: "var(--slide-ink)",
                textShadow: `3px 3px 0 color-mix(in srgb, ${right.cssVar} 55%, transparent)`,
              }}
            >
              Vs
            </span>
            {data.rows.map((row, i) => (
              <div key={`I-${row.topic}-${i}`} className="flex flex-col items-center gap-1.5">
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    height: iconBox,
                    width: iconBox,
                    background: "var(--slide-surface)",
                    color: "var(--slide-ink)",
                  }}
                >
                  <SlideIcon id={row.icon} size={iconSize} />
                </span>
                <span
                  className="max-w-[96px] text-center font-[family-name:var(--slide-font-mono)] tracking-[0.12em] uppercase"
                  style={{
                    color: "var(--slide-ink-muted)",
                    fontSize: data.rows.length >= 4 ? 10 : 11,
                  }}
                >
                  {row.topic}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex w-[calc(50%-56px)] flex-col px-6 py-7"
            style={{ background: right.cssVar }}
          >
            <LayoutSlot id="rightLabel" layout={getSlot(layout, "rightLabel")} className="mx-auto mb-6">
              <div
                className="rounded-full px-8 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-bold uppercase tracking-wide"
                style={{ background: "var(--slide-bg)", color: right.cssVar }}
              >
                <span className="slot-text">{data.rightLabel}</span>
              </div>
            </LayoutSlot>
            <div className="flex flex-1 flex-col justify-evenly">
              {data.rows.map((row, i) => (
                <div
                  key={`R-${row.topic}-${i}`}
                  className="border-b border-dashed pb-4 text-left last:border-0"
                  style={{
                    borderColor:
                      right.inkOnTone === "ink"
                        ? "color-mix(in srgb, var(--slide-ink) 25%, transparent)"
                        : "color-mix(in srgb, var(--slide-bg) 35%, transparent)",
                  }}
                >
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] font-bold uppercase tracking-wide"
                    style={{ color: sideTextColor(right.inkOnTone), fontSize: topicPx }}
                  >
                    {row.topic}
                  </p>
                  <p
                    className="slot-text mt-1 font-[family-name:var(--slide-font-body)] font-medium"
                    style={{ color: sideMutedColor(right.inkOnTone), fontSize: bodyPx }}
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
  const left = sideTone(data.leftTone, "accent");
  const right = sideTone(data.rightTone, "accentAlt");
  const dens = listDensity(data.rows.length);

  return (
    <div className="relative flex h-full flex-col px-10 pb-10 pt-10">
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text font-[family-name:var(--slide-font-display)] font-extrabold tracking-tight"
          style={{
            color: "var(--slide-ink)",
            fontSize: data.rows.length >= 4 ? 40 : 48,
          }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <div className="mt-6 flex items-center gap-4">
        <LayoutSlot id="leftLabel" layout={getSlot(layout, "leftLabel")}>
          <span
            className="slot-text rounded-full px-6 py-2 font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase"
            style={{ background: left.cssVar, color: sideTextColor(left.inkOnTone) }}
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
            style={{ background: right.cssVar, color: sideTextColor(right.inkOnTone) }}
          >
            {data.rightLabel}
          </span>
        </LayoutSlot>
      </div>

      <LayoutSlot
        id="panel"
        layout={getSlot(layout, "panel")}
        className="mt-8 flex flex-1 flex-col justify-center"
        style={{ gap: dens.gapPx }}
      >
        {data.rows.map((row, i) => (
          <div
            key={`${row.topic}-${i}`}
            className="flex items-stretch overflow-hidden rounded-[24px] shadow-[0_12px_0_rgba(0,0,0,0.08)]"
            style={{ background: "var(--slide-bg-elevated)" }}
          >
            <div
              className="flex w-[38%] flex-col justify-center px-5"
              style={{
                background: left.cssVar,
                paddingTop: dens.padYPx,
                paddingBottom: dens.padYPx,
              }}
            >
              <p
                className="slot-text font-[family-name:var(--slide-font-body)] font-medium"
                style={{ color: sideTextColor(left.inkOnTone), fontSize: dens.detailPx }}
              >
                {row.left}
              </p>
            </div>
            <div
              className="flex w-[24%] flex-col items-center justify-center gap-2 px-3 py-4"
              style={{ borderInline: "1px solid var(--slide-stroke)" }}
            >
              <span style={{ color: "var(--slide-ink)" }}>
                <SlideIcon id={row.icon} size={Math.max(22, dens.iconPx - 10)} />
              </span>
              <span
                className="slot-text text-center font-[family-name:var(--slide-font-display)] font-bold uppercase tracking-wide"
                style={{ color: "var(--slide-ink)", fontSize: Math.max(13, dens.titlePx - 12) }}
              >
                {row.topic}
              </span>
            </div>
            <div
              className="flex w-[38%] flex-col justify-center px-5"
              style={{
                background: right.cssVar,
                paddingTop: dens.padYPx,
                paddingBottom: dens.padYPx,
              }}
            >
              <p
                className="slot-text font-[family-name:var(--slide-font-body)] font-medium"
                style={{ color: sideTextColor(right.inkOnTone), fontSize: dens.detailPx }}
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
