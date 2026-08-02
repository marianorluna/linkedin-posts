import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { NumberBadge } from "./primitives";
import { SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "icon-rows" }>["data"];
};

const rowTones = [
  "var(--slide-accent)",
  "var(--slide-surface)",
  "var(--slide-accent-alt)",
  "var(--slide-highlight)",
] as const;

export function IconRowsSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <SlideEyebrow>Claves</SlideEyebrow>
      <SlideHeadline>{data.headline}</SlideHeadline>
      <div className="mt-12 flex flex-1 flex-col justify-center gap-5">
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
                  className="font-[family-name:var(--slide-font-display)] text-[30px] font-bold uppercase tracking-wide"
                  style={{ color: "var(--slide-bg)" }}
                >
                  {row.title}
                </p>
                {row.detail ? (
                  <p
                    className="mt-1 font-[family-name:var(--slide-font-body)] text-[20px]"
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
      </div>
    </SlideFrame>
  );
}
