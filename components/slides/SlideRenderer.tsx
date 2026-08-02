import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import { AbCompareSlide } from "./AbCompareSlide";
import { CtaSlide } from "./CtaSlide";
import { HookSlide } from "./HookSlide";
import { IconBentoSlide } from "./IconBentoSlide";
import { IconRowsSlide } from "./IconRowsSlide";
import { PhoneMockSlide } from "./PhoneMockSlide";
import { RibbonStepsSlide } from "./RibbonStepsSlide";
import { StatHeroSlide } from "./StatHeroSlide";
import { StepsSlide } from "./StepsSlide";
import { VsSplitSlide } from "./VsSplitSlide";

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
    case "vs-split":
      return <VsSplitSlide tokens={tokens} data={slide.data} />;
    case "ribbon-steps":
      return <RibbonStepsSlide tokens={tokens} data={slide.data} />;
    case "icon-rows":
      return <IconRowsSlide tokens={tokens} data={slide.data} />;
    case "icon-bento":
      return <IconBentoSlide tokens={tokens} data={slide.data} />;
    default: {
      const _exhaustive: never = slide;
      return _exhaustive;
    }
  }
}
