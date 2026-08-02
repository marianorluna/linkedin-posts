import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { IconWell } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "stat-hero" }>["data"];
  layout?: Extract<SlideContent, { template: "stat-hero" }>["layout"];
  variant?: VariantsFor<"stat-hero">;
};

function StatValue({
  data,
  className,
  sizeClass = "text-[168px]",
}: {
  data: Props["data"];
  className?: string;
  sizeClass?: string;
}) {
  return (
    <p
      className={`slot-text font-[family-name:var(--slide-font-display)] ${sizeClass} leading-none tracking-[-0.05em] ${className ?? ""}`}
      style={{ color: "var(--slide-accent)" }}
    >
      {data.value}
      {data.unit ? (
        <span className="ml-2 text-[56px] tracking-normal" style={{ color: "var(--slide-ink-muted)" }}>
          {data.unit}
        </span>
      ) : null}
    </p>
  );
}

function StatStack({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <>
      <div className="flex items-start justify-between">
        <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
          <SlideEyebrow>Dato clave</SlideEyebrow>
        </LayoutSlot>
        {data.icon ? (
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
            <IconWell size={80} tone="soft">
              <SlideIcon id={data.icon} size={40} />
            </IconWell>
          </LayoutSlot>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <LayoutSlot id="value" layout={getSlot(layout, "value")}>
          <StatValue data={data} />
        </LayoutSlot>
        <div className="mt-10">
          <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
            <SlideHeadline>{data.headline}</SlideHeadline>
          </LayoutSlot>
          {data.detail ? (
            <LayoutSlot id="detail" layout={getSlot(layout, "detail")}>
              <SlideBody>{data.detail}</SlideBody>
            </LayoutSlot>
          ) : null}
        </div>
      </div>
    </>
  );
}

function StatWatermark({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col">
      <LayoutSlot
        id="value"
        layout={getSlot(layout, "value")}
        className="pointer-events-none absolute -right-6 top-8 opacity-[0.12]"
      >
        <p
          className="slot-text font-[family-name:var(--slide-font-display)] text-[320px] leading-none tracking-[-0.06em]"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.value}
        </p>
      </LayoutSlot>

      <div className="relative z-10 flex items-start justify-between">
        <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
          <SlideEyebrow>Dato clave</SlideEyebrow>
        </LayoutSlot>
        {data.icon ? (
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
            <IconWell size={80} tone="soft">
              <SlideIcon id={data.icon} size={40} />
            </IconWell>
          </LayoutSlot>
        ) : null}
      </div>

      <div className="relative z-10 mt-auto max-w-[720px] pb-4">
        <p
          className="slot-text font-[family-name:var(--slide-font-display)] text-[96px] font-extrabold leading-none tracking-[-0.04em]"
          style={{ color: "var(--slide-accent)" }}
        >
          {data.value}
          {data.unit ? (
            <span className="ml-2 text-[40px]" style={{ color: "var(--slide-ink-muted)" }}>
              {data.unit}
            </span>
          ) : null}
        </p>
        <LayoutSlot id="headline" layout={getSlot(layout, "headline")} className="mt-8 block">
          <SlideHeadline>{data.headline}</SlideHeadline>
        </LayoutSlot>
        {data.detail ? (
          <LayoutSlot id="detail" layout={getSlot(layout, "detail")}>
            <SlideBody>{data.detail}</SlideBody>
          </LayoutSlot>
        ) : null}
      </div>
    </div>
  );
}

function StatLeftRail({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="flex h-full gap-10">
      <div
        className="flex w-[38%] flex-col items-center justify-center rounded-[32px] px-6"
        style={{ background: "var(--slide-accent)" }}
      >
        <LayoutSlot id="value" layout={getSlot(layout, "value")}>
          <p
            className="slot-text text-center font-[family-name:var(--slide-font-display)] text-[120px] leading-none tracking-[-0.05em]"
            style={{ color: "var(--slide-bg)" }}
          >
            {data.value}
          </p>
        </LayoutSlot>
        {data.unit ? (
          <p
            className="slot-text mt-4 font-[family-name:var(--slide-font-display)] text-[32px] font-bold uppercase tracking-wide"
            style={{ color: "color-mix(in srgb, var(--slide-bg) 85%, transparent)" }}
          >
            {data.unit}
          </p>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-between py-4">
        <div className="flex items-start justify-between">
          <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
            <SlideEyebrow>Dato clave</SlideEyebrow>
          </LayoutSlot>
          {data.icon ? (
            <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
              <IconWell size={80} tone="soft">
                <SlideIcon id={data.icon} size={40} />
              </IconWell>
            </LayoutSlot>
          ) : null}
        </div>
        <div>
          <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
            <SlideHeadline>{data.headline}</SlideHeadline>
          </LayoutSlot>
          {data.detail ? (
            <LayoutSlot id="detail" layout={getSlot(layout, "detail")}>
              <SlideBody>{data.detail}</SlideBody>
            </LayoutSlot>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function StatHeroSlide({ tokens, data, layout, variant = "stack" }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      {variant === "watermark" ? (
        <StatWatermark data={data} layout={layout} />
      ) : variant === "left-rail" ? (
        <StatLeftRail data={data} layout={layout} />
      ) : (
        <StatStack data={data} layout={layout} />
      )}
    </SlideFrame>
  );
}
