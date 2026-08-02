import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { IconWell } from "./primitives";
import { SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "ab-compare" }>["data"];
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
          className="font-[family-name:var(--slide-font-mono)] text-[24px] tracking-wide uppercase"
          style={{ color }}
        >
          {label}
        </span>
        <span
          className="font-[family-name:var(--slide-font-display)] text-[48px] tracking-tight"
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
          className="font-[family-name:var(--slide-font-body)] text-[22px]"
          style={{ color: "var(--slide-ink-muted)" }}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export function AbCompareSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <SlideEyebrow>Comparativa</SlideEyebrow>
          <SlideHeadline>{data.headline}</SlideHeadline>
        </div>
        {data.icon ? (
          <IconWell size={88} tone="soft">
            <SlideIcon id={data.icon} size={44} />
          </IconWell>
        ) : null}
      </div>
      <div className="mt-16 flex flex-1 flex-col justify-center gap-14">
        <Bar {...data.left} color="var(--slide-accent-alt)" />
        <Bar {...data.right} color="var(--slide-accent)" />
      </div>
      {data.footer ? (
        <p
          className="mt-auto font-[family-name:var(--slide-font-body)] text-[24px]"
          style={{ color: "var(--slide-ink-muted)" }}
        >
          {data.footer}
        </p>
      ) : null}
    </SlideFrame>
  );
}
