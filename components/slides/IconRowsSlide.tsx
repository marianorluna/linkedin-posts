import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { NumberBadge } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideEyebrow, SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "icon-rows" }>["data"];
  layout?: Extract<SlideContent, { template: "icon-rows" }>["layout"];
};

const rowTones = [
  "var(--slide-accent)",
  "var(--slide-surface)",
  "var(--slide-accent-alt)",
  "var(--slide-highlight)",
] as const;

export function IconRowsSlide({ tokens, data, layout }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <SlideEyebrow>Claves</SlideEyebrow>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text font-[family-name:var(--slide-font-display)] text-[64px] leading-[1.05] tracking-[-0.03em]"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>
      <LayoutSlot
        id="rows"
        layout={getSlot(layout, "rows")}
        className="mt-12 flex flex-1 flex-col justify-center gap-5"
      >
        {data.rows.map((row, index) => {
          const alignEnd = index % 2 === 1;
          return (
            <div
              key={`${row.title}-${index}`}
              className={`flex items-center gap-5 rounded-[var(--slide-radius-lg)] px-6 py-5 shadow-[0_12px_0_rgba(0,0,0,0.08)] ${
                alignEnd ? "flex-row-reverse text-right" : ""
              }`}
              style={{ background: rowTones[index % rowTones.length] }}
            >
              <NumberBadge n={index + 1} size={68} tone="surface" />
              <div className="min-w-0 flex-1">
                <p
                  className="slot-text font-[family-name:var(--slide-font-display)] text-[30px] font-bold uppercase tracking-wide"
                  style={{ color: "var(--slide-bg)" }}
                >
                  {row.title}
                </p>
                {row.detail ? (
                  <p
                    className="slot-text mt-1 font-[family-name:var(--slide-font-body)] text-[20px]"
                    style={{ color: "color-mix(in srgb, var(--slide-bg) 88%, transparent)" }}
                  >
                    {row.detail}
                  </p>
                ) : null}
              </div>
              <span style={{ color: "var(--slide-bg)" }}>
                <SlideIcon id={row.icon} size={48} />
              </span>
            </div>
          );
        })}
      </LayoutSlot>
    </SlideFrame>
  );
}
