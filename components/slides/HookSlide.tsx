import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { SlideIcon } from "@/components/icons/SlideIcon";
import { PillLabel } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideFrame } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "hook" }>["data"];
  layout?: Extract<SlideContent, { template: "hook" }>["layout"];
  variant?: VariantsFor<"hook">;
};

function AccentDots() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-[10px] w-[120px] rounded-full" style={{ background: "var(--slide-accent)" }} />
      <div className="h-[10px] w-[48px] rounded-full" style={{ background: "var(--slide-accent-alt)" }} />
      <div className="h-[10px] w-[24px] rounded-full" style={{ background: "var(--slide-highlight)" }} />
    </div>
  );
}

function BigIconWell({ icon }: { icon?: Props["data"]["icon"] }) {
  return (
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
          background: "radial-gradient(circle at 35% 30%, var(--slide-accent-soft), transparent 65%)",
          border: "2px dashed color-mix(in srgb, var(--slide-accent) 35%, transparent)",
        }}
      />
      {icon ? (
        <span style={{ color: "var(--slide-ink)" }}>
          <SlideIcon id={icon} size={160} />
        </span>
      ) : (
        <div className="h-[180px] w-[180px] rounded-full" style={{ background: "var(--slide-accent-soft)" }} />
      )}
    </div>
  );
}

function HookSplitIcon({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative h-full">
      <div className="relative z-10 flex h-full">
        <div className="relative flex w-[56%] flex-col justify-between p-[72px] pr-8">
          <div className="relative min-h-[200px]">
            {data.eyebrow ? (
              <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")} className="mb-6 inline-flex">
                <PillLabel tone="accent">
                  <span className="slot-text">{data.eyebrow}</span>
                </PillLabel>
              </LayoutSlot>
            ) : null}
            <LayoutSlot id="headline" layout={getSlot(layout, "headline")} className="mt-2 block">
              <h1
                className="slot-text font-[family-name:var(--slide-font-display)] text-[68px] font-extrabold leading-[1.05] tracking-[-0.03em]"
                style={{ color: "var(--slide-ink)" }}
              >
                {data.headline}
              </h1>
            </LayoutSlot>
            {data.subline ? (
              <LayoutSlot id="subline" layout={getSlot(layout, "subline")} className="mt-7 block max-w-[480px]">
                <p
                  className="slot-text font-[family-name:var(--slide-font-body)] text-[30px] leading-[1.35]"
                  style={{ color: "var(--slide-ink-muted)" }}
                >
                  {data.subline}
                </p>
              </LayoutSlot>
            ) : null}
          </div>
          <AccentDots />
        </div>

        <div className="relative z-10 flex w-[44%] items-center justify-center pr-12">
          <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
            <BigIconWell icon={data.icon} />
          </LayoutSlot>
        </div>
      </div>
    </div>
  );
}

function HookCentered({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-16 text-center">
      {data.eyebrow ? (
        <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")} className="mb-8 inline-flex">
          <PillLabel tone="accent">
            <span className="slot-text">{data.eyebrow}</span>
          </PillLabel>
        </LayoutSlot>
      ) : null}
      <LayoutSlot id="icon" layout={getSlot(layout, "icon")} className="mb-10">
        <div
          className="flex h-40 w-40 items-center justify-center rounded-full"
          style={{
            background: "var(--slide-bg-elevated)",
            border: "2px solid var(--slide-stroke)",
            color: "var(--slide-ink)",
          }}
        >
          {data.icon ? <SlideIcon id={data.icon} size={72} /> : null}
        </div>
      </LayoutSlot>
      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text max-w-[900px] font-[family-name:var(--slide-font-display)] text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em]"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>
      {data.subline ? (
        <LayoutSlot id="subline" layout={getSlot(layout, "subline")} className="mt-8 max-w-[720px]">
          <p
            className="slot-text font-[family-name:var(--slide-font-body)] text-[30px] leading-[1.35]"
            style={{ color: "var(--slide-ink-muted)" }}
          >
            {data.subline}
          </p>
        </LayoutSlot>
      ) : null}
      <div className="mt-14">
        <AccentDots />
      </div>
    </div>
  );
}

function HookTypeDominant({ data, layout }: Omit<Props, "tokens" | "variant">) {
  return (
    <div className="relative flex h-full flex-col justify-between p-[72px]">
      <div className="flex items-start justify-between">
        {data.eyebrow ? (
          <LayoutSlot id="eyebrow" layout={getSlot(layout, "eyebrow")} className="inline-flex">
            <PillLabel tone="accent">
              <span className="slot-text">{data.eyebrow}</span>
            </PillLabel>
          </LayoutSlot>
        ) : (
          <span />
        )}
        <LayoutSlot id="icon" layout={getSlot(layout, "icon")}>
          <div
            className="flex h-24 w-24 items-center justify-center rounded-[20px]"
            style={{
              background: "var(--slide-accent)",
              color: "var(--slide-bg)",
            }}
          >
            {data.icon ? <SlideIcon id={data.icon} size={48} /> : null}
          </div>
        </LayoutSlot>
      </div>

      <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
        <h1
          className="slot-text max-w-[960px] font-[family-name:var(--slide-font-display)] text-[84px] font-extrabold leading-[0.98] tracking-[-0.04em]"
          style={{ color: "var(--slide-ink)" }}
        >
          {data.headline}
        </h1>
      </LayoutSlot>

      <div>
        {data.subline ? (
          <LayoutSlot id="subline" layout={getSlot(layout, "subline")} className="mb-8 max-w-[780px]">
            <p
              className="slot-text font-[family-name:var(--slide-font-body)] text-[32px] leading-[1.35]"
              style={{ color: "var(--slide-ink-muted)" }}
            >
              {data.subline}
            </p>
          </LayoutSlot>
        ) : null}
        <AccentDots />
      </div>
    </div>
  );
}

export function HookSlide({ tokens, data, layout, variant = "split-icon" }: Props) {
  return (
    <SlideFrame tokens={tokens} padless>
      {variant === "centered" ? (
        <HookCentered data={data} layout={layout} />
      ) : variant === "type-dominant" ? (
        <HookTypeDominant data={data} layout={layout} />
      ) : (
        <HookSplitIcon data={data} layout={layout} />
      )}
    </SlideFrame>
  );
}
