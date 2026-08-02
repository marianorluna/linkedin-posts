import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { AbCompareSlide } from "./AbCompareSlide";
import { CtaSlide } from "./CtaSlide";
import { HookSlide } from "./HookSlide";
import { PhoneMockSlide } from "./PhoneMockSlide";
import { StatHeroSlide } from "./StatHeroSlide";
import { StepsSlide } from "./StepsSlide";

type Props = {
  slide: SlideContent;
  tokens: BrandTokens;
};

export function SlideRenderer({ slide, tokens }: Props) {
  switch (slide.template) {
    case "hook":
      return <HookSlide tokens={tokens} data={slide.data} />;
    case "ab-compare":
      return <AbCompareSlide tokens={tokens} data={slide.data} />;
    case "stat-hero":
      return <StatHeroSlide tokens={tokens} data={slide.data} />;
    case "steps":
      return <StepsSlide tokens={tokens} data={slide.data} />;
    case "phone-mock":
      return <PhoneMockSlide tokens={tokens} data={slide.data} />;
    case "cta":
      return <CtaSlide tokens={tokens} data={slide.data} />;
    default: {
      const _exhaustive: never = slide;
      return _exhaustive;
    }
  }
}
