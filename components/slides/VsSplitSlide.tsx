import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "vs-split" }>["data"];
};

export function VsSplitSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      <div className="flex h-full flex-col px-10 pb-10 pt-10">
        <h1
          className="text-center font-[family-name:var(--slide-font-display)] text-[48px] font-extrabold tracking-tight"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>

        <div className="mt-8 flex flex-1 overflow-hidden rounded-[28px] shadow-[0_18px_0_rgba(0,0,0,0.08)]">
          <div
            className="flex w-[calc(50%-56px)] flex-col px-6 py-7"
            style={{ background: "var(--slide-accent)" }}
          >
            <div
              className="mx-auto mb-6 rounded-full px-8 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-bold uppercase tracking-wide"
              style={{ background: "var(--slide-bg)", color: "var(--slide-accent)" }}
            >
              {data.leftLabel}
            </div>
            <div className="flex flex-1 flex-col justify-evenly">
              {data.rows.map((row) => (
                <div
                  key={`L-${row.topic}`}
                  className="border-b border-dashed pb-4 text-right last:border-0"
                  style={{ borderColor: "color-mix(in srgb, var(--slide-bg) 35%, transparent)" }}
                >
                  <p
                    className="font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--slide-bg)" }}
                  >
                    {row.topic}
                  </p>
                  <p
                    className="mt-1 font-[family-name:var(--slide-font-body)] text-[24px] font-medium"
                    style={{ color: "color-mix(in srgb, var(--slide-bg) 92%, transparent)" }}
                  >
                    {row.left}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative z-10 flex w-[112px] shrink-0 flex-col items-center justify-center gap-6 px-2"
            style={{
              background: "var(--slide-bg-elevated)",
              boxShadow: "0 0 0 1px var(--slide-stroke)",
            }}
          >
            <span
              className="font-[family-name:var(--slide-font-display)] text-[40px] font-black leading-none"
              style={{
                color: "var(--slide-ink)",
                textShadow: "3px 3px 0 color-mix(in srgb, var(--slide-accent-alt) 55%, transparent)",
              }}
            >
              Vs
            </span>
            {data.rows.map((row) => (
              <div key={`I-${row.topic}`} className="flex flex-col items-center gap-1.5">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background: "var(--slide-surface)",
                    color: "var(--slide-ink)",
                  }}
                >
                  <SlideIcon id={row.icon} size={28} />
                </span>
                <span
                  className="max-w-[96px] text-center font-[family-name:var(--slide-font-mono)] text-[11px] tracking-[0.12em] uppercase"
                  style={{ color: "var(--slide-ink-muted)" }}
                >
                  {row.topic}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex w-[calc(50%-56px)] flex-col px-6 py-7"
            style={{ background: "var(--slide-accent-alt)" }}
          >
            <div
              className="mx-auto mb-6 rounded-full px-8 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-bold uppercase tracking-wide"
              style={{ background: "var(--slide-bg)", color: "var(--slide-accent-alt)" }}
            >
              {data.rightLabel}
            </div>
            <div className="flex flex-1 flex-col justify-evenly">
              {data.rows.map((row) => (
                <div
                  key={`R-${row.topic}`}
                  className="border-b border-dashed pb-4 text-left last:border-0"
                  style={{ borderColor: "color-mix(in srgb, var(--slide-bg) 35%, transparent)" }}
                >
                  <p
                    className="font-[family-name:var(--slide-font-display)] text-[22px] font-bold uppercase tracking-wide"
                    style={{ color: "var(--slide-bg)" }}
                  >
                    {row.topic}
                  </p>
                  <p
                    className="mt-1 font-[family-name:var(--slide-font-body)] text-[24px] font-medium"
                    style={{ color: "color-mix(in srgb, var(--slide-bg) 92%, transparent)" }}
                  >
                    {row.right}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
