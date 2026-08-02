import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "phone-mock" }>["data"];
};

export function PhoneMockSlide({ tokens, data }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="grid h-full grid-cols-[1.05fr_0.95fr] items-center gap-10">
        <div>
          <SlideEyebrow>Vista móvil</SlideEyebrow>
          <SlideHeadline>{data.headline}</SlideHeadline>
          {data.caption ? <SlideBody>{data.caption}</SlideBody> : null}
        </div>
        <div className="flex justify-end">
          <div
            className="relative h-[760px] w-[380px] p-[18px]"
            style={{
              borderRadius: "var(--slide-radius-phone)",
              border: "var(--slide-stroke-width) solid var(--slide-stroke)",
              background: "var(--slide-bg)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="absolute left-1/2 top-[28px] h-[18px] w-[110px] -translate-x-1/2 rounded-full"
              style={{ background: "var(--slide-surface)" }}
            />
            <div
              className="flex h-full flex-col rounded-[36px] p-8 pt-16"
              style={{ background: "var(--slide-bg-elevated)" }}
            >
              <p
                className="font-[family-name:var(--slide-font-mono)] text-[18px] tracking-[0.14em] uppercase"
                style={{ color: "var(--slide-accent)" }}
              >
                {data.screenTitle}
              </p>
              <ul className="mt-10 space-y-6">
                {data.screenLines.map((line) => (
                  <li
                    key={line}
                    className="rounded-[14px] px-5 py-4 font-[family-name:var(--slide-font-body)] text-[22px]"
                    style={{
                      background: "var(--slide-accent-soft)",
                      border: "1px solid var(--slide-stroke)",
                      color: "var(--slide-ink)",
                    }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
              <div
                className="mt-auto h-[10px] w-[120px] self-center rounded-full"
                style={{ background: "var(--slide-stroke)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
