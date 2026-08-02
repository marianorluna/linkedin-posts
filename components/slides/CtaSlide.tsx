import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "cta" }>["data"];
  layout?: Extract<SlideContent, { template: "cta" }>["layout"];
  variant?: VariantsFor<"cta">;
};

function CtaPill({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center rounded-full px-12 py-5 font-[family-name:var(--slide-font-display)] text-[34px] font-bold shadow-[0_12px_0_rgba(0,0,0,0.1)]"
      style={{ background: "var(--slide-accent)", color: "var(--slide-bg)" }}
    >
      <span className="slot-text">{label}</span>
    </div>
  );
}

function CtaCentered({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col items-center justify-between px-16 py-16 text-center">
      <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
        <p
          className="slot-text relative z-10 font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.18em] uppercase"
          style={{ color: "var(--slide-accent)" }}
        >
          Cierre
        </p>
      </LayoutSlot>

      <div className="relative z-10 flex flex-col items-center">
        {data.icon ? (
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")} className="mb-8">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full shadow-[0_16px_0_rgba(0,0,0,0.08)]"
              style={{
                background: "var(--slide-bg-elevated)",
                color: "var(--slide-ink)",
                border: "2px solid var(--slide-stroke)",
              }}
            >
              <SlideIcon id={data.icon} size={64} />
            </div>
          </LayoutSlot>
        ) : null}
        <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
          <h1
            className="slot-text max-w-[860px] font-[family-name:var(--slide-font-display)] text-[56px] font-extrabold leading-[1.1] tracking-tight"
            style={{ color: "var(--slide-ink)" }}
          >
            {data.headline}
          </h1>
        </LayoutSlot>
        {data.prompt ? (
          <LayoutSlot id="prompt" layout={getSlot(layout, "prompt")} className="mt-6">
            <p
              className="slot-text max-w-[700px] font-[family-name:var(--slide-font-body)] text-[28px]"
              style={{ color: "var(--slide-ink-muted)" }}
            >
              {data.prompt}
            </p>
          </LayoutSlot>
        ) : null}
      </div>

      <LayoutSlot id="cta" layout={getSlot(layout, "cta")}>
        <div className="relative z-10">
          <CtaPill label={data.cta} />
        </div>
      </LayoutSlot>
    </div>
  );
}

function CtaBottomBar({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-center px-16 pt-16">
        <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
          <p
            className="slot-text mb-8 font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.18em] uppercase"
            style={{ color: "var(--slide-accent)" }}
          >
            Cierre
          </p>
        </LayoutSlot>
        <div className="flex items-start gap-8">
          {data.icon ? (
            <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
              <div
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[24px]"
                style={{ background: "var(--slide-accent-soft)", color: "var(--slide-ink)" }}
              >
                <SlideIcon id={data.icon} size={56} />
              </div>
            </LayoutSlot>
          ) : null}
          <div>
            <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
              <h1
                className="slot-text max-w-[820px] font-[family-name:var(--slide-font-display)] text-[52px] font-extrabold leading-[1.1]"
                style={{ color: "var(--slide-ink)" }}
              >
                {data.headline}
              </h1>
            </LayoutSlot>
            {data.prompt ? (
              <LayoutSlot id="prompt" layout={getSlot(layout, "prompt")} className="mt-5">
                <p
                  className="slot-text max-w-[720px] font-[family-name:var(--slide-font-body)] text-[28px]"
                  style={{ color: "var(--slide-ink-muted)" }}
                >
                  {data.prompt}
                </p>
              </LayoutSlot>
            ) : null}
          </div>
        </div>
      </div>
      <LayoutSlot id="cta" layout={getSlot(layout, "cta")}>
        <div
          className="flex h-[160px] items-center justify-center px-16"
          style={{ background: "var(--slide-accent)" }}
        >
          <span
            className="slot-text font-[family-name:var(--slide-font-display)] text-[40px] font-bold"
            style={{ color: "var(--slide-bg)" }}
          >
            {data.cta}
          </span>
        </div>
      </LayoutSlot>
    </div>
  );
}

function CtaQuestionBig({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col justify-between p-16">
      <div className="flex items-center justify-between">
        <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")}>
          <p
            className="slot-text font-[family-name:var(--slide-font-mono)] text-[20px] tracking-[0.18em] uppercase"
            style={{ color: "var(--slide-accent)" }}
          >
            Cierre
          </p>
        </LayoutSlot>
        {data.icon ? (
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
            <div style={{ color: "var(--slide-ink)" }}>
              <SlideIcon id={data.icon} size={56} />
            </div>
          </LayoutSlot>
        ) : null}
      </div>

      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text max-w-[960px] font-[family-name:var(--slide-font-display)] text-[72px] font-extrabold leading-[1.02] tracking-[-0.03em]"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <div className="flex items-end justify-between gap-8">
        {data.prompt ? (
          <LayoutSlot id="prompt" layout={getSlot(layout, "prompt")} className="max-w-[520px]">
            <p
              className="slot-text font-[family-name:var(--slide-font-body)] text-[28px]"
              style={{ color: "var(--slide-ink-muted)" }}
            >
              {data.prompt}
            </p>
          </LayoutSlot>
        ) : (
          <span />
        )}
        <LayoutSlot id="cta" layout={getSlot(layout, "cta")}>
          <CtaPill label={data.cta} />
        </LayoutSlot>
      </div>
    </div>
  );
}

export function CtaSlide({ tokens, data, layout, variant = "centered" }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      {variant === "bottom-bar" ? (
        <CtaBottomBar data={data} layout={layout} />
      ) : variant === "question-big" ? (
        <CtaQuestionBig data={data} layout={layout} />
      ) : (
        <CtaCentered data={data} layout={layout} />
      )}
    </SlideFrame>
  );
}
