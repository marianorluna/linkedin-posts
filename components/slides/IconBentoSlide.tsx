import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "icon-bento" }>["data"];
  layout?: Extract<SlideContent, { template: "icon-bento" }>["layout"];
};

const cellTones = [
  "var(--slide-accent)",
  "var(--slide-accent-alt)",
  "var(--slide-highlight)",
  "var(--slide-surface)",
  "var(--slide-accent)",
  "var(--slide-accent-alt)",
] as const;

export function IconBentoSlide({ tokens, data, layout }: Props) {
  const cols = data.cells.length <= 3 ? 3 : 2;

  return (
    <SlideFrame tokens={tokens}>
      <div className="mb-2">
        <p
          className="mb-3 font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.16em] uppercase"
          style={{ color: "var(--slide-accent)" }}
        >
          Claves
        </p>
        <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
          <h1
            className="slot-text font-[family-name:var(--slide-font-display)] text-[52px] font-extrabold leading-[1.05] tracking-tight"
            style={{ color: "var(--slide-ink)" }}
          >
            {data.headline}
          </h1>
        </LayoutSlot>
        {data.subline ? (
          <LayoutSlot id="subline" layout={getSlot(layout, "subline")} className="mt-4 block">
            <p
              className="slot-text font-[family-name:var(--slide-font-body)] text-[26px]"
              style={{ color: "var(--slide-ink-muted)" }}
            >
              {data.subline}
            </p>
          </LayoutSlot>
        ) : null}
      </div>

      <LayoutSlot
        id="grid"
        layout={getSlot(layout, "grid")}
        className="mt-8 flex flex-1 flex-col justify-center"
      >
        <div
          className="grid w-full gap-5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {data.cells.map((cell, index) => {
            const tone = cellTones[index % cellTones.length];
            const onDark = tone === "var(--slide-surface)";
            return (
              <div
                key={`${cell.label}-${cell.icon}`}
                className="overflow-hidden rounded-[24px] shadow-[0_14px_0_rgba(0,0,0,0.08)]"
                style={{ background: "var(--slide-bg-elevated)" }}
              >
                <div className="flex items-center gap-4 px-5 py-4" style={{ background: tone }}>
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: "color-mix(in srgb, var(--slide-bg) 92%, transparent)",
                      color: onDark ? "var(--slide-ink)" : tone,
                    }}
                  >
                    <SlideIcon id={cell.icon} size={30} />
                  </span>
                  <p
                    className="slot-text font-[family-name:var(--slide-font-display)] text-[28px] font-bold tracking-tight"
                    style={{ color: onDark ? "var(--slide-ink)" : "var(--slide-bg)" }}
                  >
                    {cell.label}
                  </p>
                </div>
                {cell.detail ? (
                  <p
                    className="slot-text px-5 py-4 font-[family-name:var(--slide-font-body)] text-[22px]"
                    style={{ color: "var(--slide-ink-muted)" }}
                  >
                    {cell.detail}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </LayoutSlot>
    </SlideFrame>
  );
}
