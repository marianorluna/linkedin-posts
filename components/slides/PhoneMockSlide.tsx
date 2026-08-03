import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { VariantsFor } from "@/lib/schemas/variants";
import { getSlot } from "@/lib/domain/layout";
import { BrowserFrame, LaptopFrame, PhoneFrame } from "./primitives";
import { LayoutSlot } from "./layout/LayoutSlot";
import { SlideBody, SlideEyebrow, SlideFrame, SlideHeadline } from "./SlideFrame";

type Props = {
  tokens: BrandTokens;
  data: Extract<SlideContent, { template: "phone-mock" }>["data"];
  layout?: Extract<SlideContent, { template: "phone-mock" }>["layout"];
  variant?: VariantsFor<"phone-mock">;
};

const eyebrowByVariant: Record<VariantsFor<"phone-mock">, string> = {
  default: "Vista móvil",
  laptop: "Vista desktop",
  browser: "Vista web",
};

export function PhoneMockSlide({ tokens, data, layout, variant = "default" }: Props) {
  return (
    <SlideFrame tokens={tokens}>
      <div className="grid h-full grid-cols-[1.05fr_0.95fr] items-center gap-10">
        <div>
          <SlideEyebrow>{eyebrowByVariant[variant]}</SlideEyebrow>
          <LayoutSlot id="headline" layout={getSlot(layout, "headline")}>
            <SlideHeadline>{data.headline}</SlideHeadline>
          </LayoutSlot>
          {data.caption ? (
            <LayoutSlot id="caption" layout={getSlot(layout, "caption")}>
              <SlideBody>{data.caption}</SlideBody>
            </LayoutSlot>
          ) : null}
        </div>
        <LayoutSlot id="phone" layout={getSlot(layout, "phone")} className="flex justify-end">
          {variant === "laptop" ? (
            <LaptopFrame screenTitle={data.screenTitle} screenLines={data.screenLines} />
          ) : variant === "browser" ? (
            <BrowserFrame screenTitle={data.screenTitle} screenLines={data.screenLines} />
          ) : (
            <PhoneFrame screenTitle={data.screenTitle} screenLines={data.screenLines} />
          )}
        </LayoutSlot>
      </div>
    </SlideFrame>
  );
}
