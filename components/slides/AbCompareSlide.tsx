import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { IconWell } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideEyebrow, SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "ab-compare" }>["data"];
  layout?: Extract<SlideContent, { template: "ab-compare" }>["layout"];
};

function Bar({
  label,
  value,
  caption,
  color,
}: {
  label: string;
  value: number;
  caption?: string;
  color: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span
          className="slot-text font-[family-name:var(--slide-font-mono)] text-[24px] tracking-wide uppercase"
          style={{ color }}
        >
          {label}
        </span>
        <span
          className="slot-text font-[family-name:var(--slide-font-display)] text-[48px] tracking-tight"
          style={{ color: "var(--slide-ink)" }}
        >
          {value}%
        </span>
      </div>
      <div
        className="h-[28px] overflow-hidden rounded-full"
        style={{ background: "var(--slide-bar-track)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      {caption ? (
        <p
          className="slot-text font-[family-name:var(--slide-font-body)] text-[22px]"
          style={{ color: "var(--slide-ink-muted)" }}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export function AbCompareSlide({ tokens, data, layout }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="flex items-start justify-between gap-6">
        <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
          <SlideEyebrow>Comparativa</SlideEyebrow>
          <h1
            className="slot-text font-[family-name:var(--slide-font-display)] text-[64px] leading-[1.05] tracking-[-0.03em]"
            style={{ color: "var(--slide-ink)" }}
          >
            {data.headline}
          </h1>
        </LayoutSlot>
        {data.icon ? (
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
            <IconWell size={88} tone="soft">
              <SlideIcon id={data.icon} size={44} />
            </IconWell>
          </LayoutSlot>
        ) : null}
      </div>
      <LayoutSlot
        id="bars"
        layout={getSlot(layout, "bars")}
        className="mt-16 flex flex-1 flex-col justify-center gap-14"
      >
        <Bar {...data.left} color="var(--slide-accent-alt)" />
        <Bar {...data.right} color="var(--slide-accent)" />
      </LayoutSlot>
      {data.footer ? (
        <LayoutSlot id="footer" layout={getSlot(layout, "footer")} className="mt-auto">
          <p
            className="slot-text font-[family-name:var(--slide-font-body)] text-[24px]"
            style={{ color: "var(--slide-ink-muted)" }}
          >
            {data.footer}
          </p>
        </LayoutSlot>
      ) : null}
    </SlideFrame>
  );
}
