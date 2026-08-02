import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "ab-compare" }>["data"];
};

function Bar({
  label,
  value,
  caption,
  emphasize,
}: {
  label: string;
  value: number;
  caption?: string;
  emphasize?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span
          className="font-[family-name:var(--font-mono)] text-[24px] tracking-wide uppercase"
          style={{ color: emphasize ? "var(--slide-accent)" : "var(--slide-ink-muted)" }}
        >
          {label}
        </span>
        <span
          className="font-[family-name:var(--font-display)] text-[48px] tracking-tight"
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
          style={{
            width: `${value}%`,
            background: emphasize ? "var(--slide-accent)" : "var(--slide-surface)",
          }}
        />
      </div>
      {caption ? (
        <p
          className="font-[family-name:var(--font-body)] text-[22px]"
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
      <SlideEyebrow>Comparativa</SlideEyebrow>
      <SlideHeadline>{data.headline}</SlideHeadline>
      <div className="mt-16 flex flex-1 flex-col justify-center gap-14">
        <Bar {...data.left} />
        <Bar {...data.right} emphasize />
      </div>
      {data.footer ? (
        <p
          className="mt-auto font-[family-name:var(--font-body)] text-[24px]"
          style={{ color: "var(--slide-ink-muted)" }}
        >
          {data.footer}
        </p>
      ) : null}
    </SlideFrame>
  );
}
