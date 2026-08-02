import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
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

const cellTones = [
  "var(--slide-accent)",
  "var(--slide-accent-alt)",
  "var(--slide-highlight)",
  "var(--slide-surface)",
  "var(--slide-accent)",
  "var(--slide-accent-alt)",
] as const;

function BentoHeader({ data, layout }: Omit<Props, "tokens" | "variant">) {
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
  );
}

function BentoCell({
  cell,
  tone,
}: {
  cell: Props["data"]["cells"][number];
  tone: (typeof cellTones)[number];
}) {
  const onDark = tone === "var(--slide-surface)";
  return (
    <div
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
}

function BentoGrid({ data, layout }: Omit<Props, "tokens" | "variant">) {
  const cols = data.cells.length <= 3 ? 3 : 2;
  return (
    <>
      <BentoHeader data={data} layout={layout} />
      <LayoutSlot id="grid" layout={getSlot(layout, "grid")} className="mt-8 flex flex-1 flex-col justify-center">
        <div
          className="grid w-full gap-5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {data.cells.map((cell, index) => (
            <BentoCell
              key={`${cell.label}-${cell.icon}`}
              cell={cell}
              tone={cellTones[index % cellTones.length]}
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

  return (
    <>
      <BentoHeader data={data} layout={layout} />
      <LayoutSlot id="grid" layout={getSlot(layout, "grid")} className="mt-8 flex flex-1 gap-5">
        <div
          className="flex w-[48%] flex-col justify-between overflow-hidden rounded-[28px] p-8 shadow-[0_16px_0_rgba(0,0,0,0.08)]"
          style={{ background: "var(--slide-accent)" }}
        >
          <span
            className="flex h-24 w-24 items-center justify-center rounded-[28px]"
            style={{ background: "color-mix(in srgb, var(--slide-bg) 90%, transparent)", color: "var(--slide-accent)" }}
          >
            <SlideIcon id={hero.icon} size={52} />
          </span>
          <div>
            <p
              className="slot-text font-[family-name:var(--slide-font-display)] text-[40px] font-extrabold"
              style={{ color: "var(--slide-bg)" }}
            >
              {hero.label}
            </p>
            {hero.detail ? (
              <p
                className="slot-text mt-3 font-[family-name:var(--slide-font-body)] text-[24px]"
                style={{ color: "color-mix(in srgb, var(--slide-bg) 88%, transparent)" }}
              >
                {hero.detail}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {rest.map((cell, index) => (
            <BentoCell
              key={`${cell.label}-${cell.icon}`}
              cell={cell}
              tone={cellTones[(index + 1) % cellTones.length]}
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
