import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "cta" }>["data"];
};

export function CtaSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      <div className="relative flex h-full flex-col items-center justify-between px-16 py-16 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--slide-accent) 14%, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute right-10 top-16 h-28 w-28 rounded-full"
          style={{ background: "var(--slide-accent-alt)" }}
        />
        <div
          className="pointer-events-none absolute bottom-28 left-16 h-20 w-20 rounded-full"
          style={{ background: "var(--slide-highlight)" }}
        />

        <p
          className="relative z-10 font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.18em] uppercase"
          style={{ color: "var(--slide-accent)" }}
        >
          Cierre
        </p>

        <div className="relative z-10 flex flex-col items-center">
          {data.icon ? (
            <div
              className="mb-8 flex h-36 w-36 items-center justify-center rounded-full shadow-[0_16px_0_rgba(0,0,0,0.08)]"
              style={{
                background: "var(--slide-bg-elevated)",
                color: "var(--slide-ink)",
                border: "2px solid var(--slide-stroke)",
              }}
            >
              <SlideIcon id={data.icon} size={64} />
            </div>
          ) : null}
          <h1
            className="max-w-[860px] font-[family-name:var(--slide-font-display)] text-[56px] font-extrabold leading-[1.1] tracking-tight"
            style={{ color: "var(--slide-ink)" }}
          >
            {data.headline}
          </h1>
          {data.prompt ? (
            <p
              className="mt-6 max-w-[700px] font-[family-name:var(--slide-font-body)] text-[28px]"
              style={{ color: "var(--slide-ink-muted)" }}
            >
              {data.prompt}
            </p>
          ) : null}
        </div>

        <div
          className="relative z-10 inline-flex items-center rounded-full px-12 py-5 font-[family-name:var(--slide-font-display)] text-[34px] font-bold shadow-[0_12px_0_rgba(0,0,0,0.1)]"
          style={{
            background: "var(--slide-accent)",
            color: "var(--slide-bg)",
          }}
        >
          {data.cta}
        </div>
      </div>
    </SlideFrame>
  );
}
