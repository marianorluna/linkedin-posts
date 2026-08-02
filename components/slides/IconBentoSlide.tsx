import type { BrandTokens } from "@/lib/design-tokens";
import { bentoColumnCount, listDensity } from "@/lib/domain/repeatable-items";
import { resolveItemTone } from "@/lib/domain/item-tone";
import type { SlideContent } from "@/lib/schemas/carousel";
import { ITEM_TONE_CYCLES } from "@/lib/schemas/item-tone";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "icon-bento" }>["data"];
  layout?: Extract<SlideContent, { template: "icon-bento" }>["layout"];
  variant?: VariantsFor<"icon-bento">;
};

type Cell = Props["data"]["cells"][number];

function BentoHeader({ data, layout }: Omit<Props, "tokens" | "variant">) {
  const n = data.cells.length;
  const compact = n >= 5;
  const tight = n >= 8;
  return (
    <div className="mb-2">
      <p
        className="mb-3 font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.16em] uppercase"
        style={{ color: "var(--slide-accent)" }}
      >
        Claves
      </p>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text font-[family-name:var(--slide-font-display)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: "var(--slide-ink)", fontSize: tight ? 36 : compact ? 44 : 52 }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>
      {data.subline ? (
        <LayoutSlot id="subline" layout={getSlot(layout, "subline")} className="mt-4 block">
          <p
            className="slot-text font-[family-name:var(--slide-font-body)]"
            style={{ color: "var(--slide-ink-muted)", fontSize: tight ? 18 : compact ? 22 : 26 }}
          >
            {data.subline}
          </p>
        </LayoutSlot>
      ) : null}
    </div>
  );
}

function BentoCell({
  cell,
  index,
  dense,
  compact,
}: {
  cell: Cell;
  index: number;
  dense: boolean;
  compact: boolean;
}) {
  const { cssVar, inkOnTone } = resolveItemTone(cell.tone, index, ITEM_TONE_CYCLES.bento);
  const onDark = inkOnTone === "ink";
  const padY = compact ? 8 : dense ? 12 : 16;
  const iconBox = compact ? 36 : dense ? 44 : 56;
  const iconSize = compact ? 18 : dense ? 24 : 30;
  const titlePx = compact ? 18 : dense ? 22 : 28;
  const detailPx = compact ? 15 : dense ? 18 : 22;
  return (
    <div
      className="overflow-hidden rounded-[24px] shadow-[0_14px_0_rgba(0,0,0,0.08)]"
      style={{ background: "var(--slide-bg-elevated)" }}
    >
      <div
        className="flex items-center gap-4 px-5"
        style={{ background: cssVar, paddingTop: padY, paddingBottom: padY }}
      >
        <span
          className="flex shrink-0 items-center justify-center rounded-2xl"
          style={{
            height: iconBox,
            width: iconBox,
            background: "color-mix(in srgb, var(--slide-bg) 92%, transparent)",
            color: onDark ? "var(--slide-ink)" : cssVar,
          }}
        >
          <SlideIcon id={cell.icon} size={iconSize} />
        </span>
        <p
          className="slot-text font-[family-name:var(--slide-font-display)] font-bold tracking-tight"
          style={{
            color: onDark ? "var(--slide-ink)" : "var(--slide-bg)",
            fontSize: titlePx,
          }}
        >
          {cell.label}
        </p>
      </div>
      {cell.detail ? (
        <p
          className="slot-text px-5 font-[family-name:var(--slide-font-body)]"
          style={{
            color: "var(--slide-ink-muted)",
            fontSize: detailPx,
            paddingTop: padY,
            paddingBottom: padY,
          }}
        >
          {cell.detail}
        </p>
      ) : null}
    </div>
  );
}

function BentoGrid({ data, layout }: Omit<Props, "tokens" | "variant">) {
  const cols = bentoColumnCount(data.cells.length);
  const n = data.cells.length;
  const dense = n >= 5;
  const compact = n >= 7;
  const dens = listDensity(n);
  return (
    <>
      <BentoHeader data={data} layout={layout} />
      <LayoutSlot
        id="grid"
        layout={getSlot(layout, "grid")}
        className="flex flex-1 flex-col justify-center"
        style={{ marginTop: dens.mtPx }}
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: compact ? 10 : dense ? 14 : 20,
          }}
        >
          {data.cells.map((cell, index) => (
            <BentoCell
              key={`${cell.label}-${cell.icon}-${index}`}
              cell={cell}
              index={index}
              dense={dense}
              compact={compact}
            />
          ))}
        </div>
      </LayoutSlot>
    </>
  );
}

function BentoHeroCell({ data, layout }: Omit<Props, "tokens" | "variant">) {
  const [hero, ...rest] = data.cells;
  if (!hero) return <BentoGrid data={data} layout={layout} />;
  const n = data.cells.length;
  const dense = rest.length >= 4;
  const compact = rest.length >= 6;
  const dens = listDensity(n);
  const heroTone = resolveItemTone(hero.tone, 0, ITEM_TONE_CYCLES.bento);

  return (
    <>
      <BentoHeader data={data} layout={layout} />
      <LayoutSlot
        id="grid"
        layout={getSlot(layout, "grid")}
        className="flex flex-1 gap-5"
        style={{ marginTop: dens.mtPx }}
      >
        <div
          className="flex w-[48%] flex-col justify-between overflow-hidden rounded-[28px] p-8 shadow-[0_16px_0_rgba(0,0,0,0.08)]"
          style={{ background: heroTone.cssVar }}
        >
          <span
            className="flex h-24 w-24 items-center justify-center rounded-[28px]"
            style={{
              background: "color-mix(in srgb, var(--slide-bg) 90%, transparent)",
              color: heroTone.cssVar,
            }}
          >
            <SlideIcon id={hero.icon} size={52} />
          </span>
          <div>
            <p
              className="slot-text font-[family-name:var(--slide-font-display)] text-[40px] font-extrabold"
              style={{
                color: heroTone.inkOnTone === "ink" ? "var(--slide-ink)" : "var(--slide-bg)",
              }}
            >
              {hero.label}
            </p>
            {hero.detail ? (
              <p
                className="slot-text mt-3 font-[family-name:var(--slide-font-body)] text-[24px]"
                style={{
                  color:
                    heroTone.inkOnTone === "ink"
                      ? "var(--slide-ink-muted)"
                      : "color-mix(in srgb, var(--slide-bg) 88%, transparent)",
                }}
              >
                {hero.detail}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col" style={{ gap: compact ? 6 : dense ? 10 : 16 }}>
          {rest.map((cell, index) => (
            <BentoCell
              key={`${cell.label}-${cell.icon}-${index}`}
              cell={cell}
              index={index + 1}
              dense={dense}
              compact={compact}
            />
          ))}
        </div>
      </LayoutSlot>
    </>
  );
}

export function IconBentoSlide({ tokens, data, layout, variant = "grid" }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      {variant === "hero-cell" ? (
        <BentoHeroCell data={data} layout={layout} />
      ) : (
        <BentoGrid data={data} layout={layout} />
      )}
    </SlideFrame>
  );
}
