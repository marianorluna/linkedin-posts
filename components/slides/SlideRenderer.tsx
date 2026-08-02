"use client";

import type { BrandTokens } from "@/lib/design-tokens";
import type { SlideContent } from "@/lib/schemas/carousel";
import type { Contrast, Motif } from "@/lib/schemas/episode-visual";
import { resolveVariant } from "@/lib/schemas/variants";
import { AbCompareSlide } from "./AbCompareSlide";
import { CtaSlide } from "./CtaSlide";
import { EpisodeFrameProvider } from "./EpisodeFrameContext";
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
  motif?: Motif;
  contrast?: Contrast;
  legacyMoodDecor?: boolean;
};

export function SlideRenderer({
  slide,
  tokens,
  motif = "none",
  contrast = "soft",
  legacyMoodDecor = true,
}: Props) {
  const body = (() => {
    switch (slide.template) {
      case "hook":
        return (
          <HookSlide
            tokens={tokens}
            data={slide.data}
            layout={slide.layout}
            variant={resolveVariant("hook", slide.variant)}
          />
        );
      case "ab-compare":
        return (
          <AbCompareSlide tokens={tokens} data={slide.data} layout={slide.layout} />
        );
      case "stat-hero":
        return (
          <StatHeroSlide
            tokens={tokens}
            data={slide.data}
            layout={slide.layout}
            variant={resolveVariant("stat-hero", slide.variant)}
          />
        );
      case "steps":
        return <StepsSlide tokens={tokens} data={slide.data} layout={slide.layout} />;
      case "phone-mock":
        return <PhoneMockSlide tokens={tokens} data={slide.data} layout={slide.layout} />;
      case "cta":
        return (
          <CtaSlide
            tokens={tokens}
            data={slide.data}
            layout={slide.layout}
            variant={resolveVariant("cta", slide.variant)}
          />
        );
      case "vs-split":
        return (
          <VsSplitSlide
            tokens={tokens}
            data={slide.data}
            layout={slide.layout}
            variant={resolveVariant("vs-split", slide.variant)}
          />
        );
      case "ribbon-steps":
        return (
          <RibbonStepsSlide
            tokens={tokens}
            data={slide.data}
            layout={slide.layout}
            variant={resolveVariant("ribbon-steps", slide.variant)}
          />
        );
      case "icon-rows":
        return <IconRowsSlide tokens={tokens} data={slide.data} layout={slide.layout} />;
      case "icon-bento":
        return (
          <IconBentoSlide
            tokens={tokens}
            data={slide.data}
            layout={slide.layout}
            variant={resolveVariant("icon-bento", slide.variant)}
          />
        );
      default: {
        const _exhaustive: never = slide;
        return _exhaustive;
      }
    }
  })();

  return (
    <EpisodeFrameProvider motif={motif} contrast={contrast} legacyMoodDecor={legacyMoodDecor}>
      {body}
    </EpisodeFrameProvider>
  );
}
