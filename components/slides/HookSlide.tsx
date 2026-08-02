import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { PillLabel } from "./primitives";
import { SlideFrame } from "./SlideFrame";

type Props = { tokens: BrandTokens; data: Extract<SlideContent, { template: "hook" }>["data"] };

export function HookSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      <div className="relative flex h-full">
        <div
          className="pointer-events-none absolute -right-24 top-16 h-[520px] w-[520px] rounded-full"
          style={{
            background: "color-mix(in srgb, var(--slide-accent) 16%, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full"
          style={{
            background: "color-mix(in srgb, var(--slide-accent-alt) 12%, transparent)",
          }}
        />

        <div className="relative z-10 flex w-[56%] flex-col justify-between p-[72px] pr-8">
          <div>
            {data.eyebrow ? <PillLabel tone="accent">{data.eyebrow}</PillLabel> : null}
            <h1
              className="mt-8 font-[family-name:var(--slide-font-display)] text-[68px] font-extrabold leading-[1.05] tracking-[-0.03em]"
              style={{ color: "var(--slide-ink)" }}
            >
              {data.headline}
            </h1>
            {data.subline ? (
              <p
                className="mt-7 max-w-[480px] font-[family-name:var(--slide-font-body)] text-[30px] leading-[1.35]"
                style={{ color: "var(--slide-ink-muted)" }}
              >
                {data.subline}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <div
              className="h-[10px] w-[120px] rounded-full"
              style={{ background: "var(--slide-accent)" }}
            />
            <div
              className="h-[10px] w-[48px] rounded-full"
              style={{ background: "var(--slide-accent-alt)" }}
            />
            <div
              className="h-[10px] w-[24px] rounded-full"
              style={{ background: "var(--slide-highlight)" }}
            />
          </div>
        </div>

        <div className="relative z-10 flex w-[44%] items-center justify-center pr-12">
          <div
            className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full"
            style={{
              background: "var(--slide-bg-elevated)",
              boxShadow:
                "0 24px 0 color-mix(in srgb, var(--slide-ink) 8%, transparent), inset 0 0 0 2px var(--slide-stroke)",
            }}
          >
            <div
              className="absolute inset-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, var(--slide-accent-soft), transparent 65%)",
                border: "2px dashed color-mix(in srgb, var(--slide-accent) 35%, transparent)",
              }}
            />
            {data.icon ? (
              <span style={{ color: "var(--slide-ink)" }}>
                <SlideIcon id={data.icon} size={160} />
              </span>
            ) : (
              <div
                className="h-[180px] w-[180px] rounded-full"
                style={{ background: "var(--slide-accent-soft)" }}
              />
            )}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
