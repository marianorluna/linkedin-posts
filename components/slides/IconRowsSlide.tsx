import type { BrandTokens } from "@/lib/design-tokens";
import { listDensity } from "@/lib/domain/repeatable-items";
import { resolveItemTone } from "@/lib/domain/item-tone";
import type { SlideContent } from "@/lib/schemas/carousel";
import { ITEM_TONE_CYCLES } from "@/lib/schemas/item-tone";
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

export function IconRowsSlide({ tokens, data, layout }: Props) {
  const dens = listDensity(data.rows.length);
  return (
    <SlideFrame tokens={tokens}>
      <SlideEyebrow>Claves</SlideEyebrow>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text font-[family-name:var(--slide-font-display)] leading-[1.05] tracking-[-0.03em]"
          style={{
            color: "var(--slide-ink)",
            fontSize: data.rows.length >= 5 ? 48 : 64,
          }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>
      <LayoutSlot
        id="rows"
        layout={getSlot(layout, "rows")}
        className="flex flex-1 flex-col justify-center"
        style={{ marginTop: dens.mtPx, gap: dens.gapPx }}
      >
        {data.rows.map((row, index) => {
          const alignEnd = index % 2 === 1;
          const { cssVar, inkOnTone } = resolveItemTone(row.tone, index, ITEM_TONE_CYCLES.rows);
          const darkText = inkOnTone === "ink";
          return (
            <div
              key={`${row.title}-${index}`}
              className={`flex items-center gap-5 rounded-[var(--slide-radius-lg)] px-6 shadow-[0_12px_0_rgba(0,0,0,0.08)] ${
                alignEnd ? "flex-row-reverse text-right" : ""
              }`}
              style={{
                background: cssVar,
                paddingTop: dens.padYPx,
                paddingBottom: dens.padYPx,
              }}
            >
              <NumberBadge n={index + 1} size={dens.badgePx} tone="surface" />
              <div className="min-w-0 flex-1">
                <p
                  className="slot-text font-[family-name:var(--slide-font-display)] font-bold uppercase tracking-wide"
                  style={{
                    color: darkText ? "var(--slide-ink)" : "var(--slide-bg)",
                    fontSize: dens.titlePx,
                  }}
                >
                  {row.title}
                </p>
                {row.detail ? (
                  <p
                    className="slot-text mt-1 font-[family-name:var(--slide-font-body)]"
                    style={{
                      color: darkText
                        ? "var(--slide-ink-muted)"
                        : "color-mix(in srgb, var(--slide-bg) 88%, transparent)",
                      fontSize: dens.detailPx,
                    }}
                  >
                    {row.detail}
                  </p>
                ) : null}
              </div>
              <span style={{ color: darkText ? "var(--slide-ink)" : "var(--slide-bg)" }}>
                <SlideIcon id={row.icon} size={dens.iconPx} />
              </span>
            </div>
          );
        })}
      </LayoutSlot>
    </SlideFrame>
  );
}
