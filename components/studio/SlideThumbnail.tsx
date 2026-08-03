"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { SlideRenderer } from "@/components/slides/SlideRenderer";
import { SLIDE_SIZE, type BrandTokens } from "@/lib/design-tokens";
import type { Contrast, Motif } from "@/lib/schemas/episode-visual";
import type { SlideContent } from "@/lib/schemas/carousel";

export type SlideThumbnailData = {
  slide: SlideContent;
  tokens: BrandTokens;
  motif: Motif;
  contrast: Contrast;
  legacyMoodDecor: boolean;
};

type Props = SlideThumbnailData & {
  className?: string;
};

function useFitScale(containerRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const size = Math.min(el.clientWidth, el.clientHeight);
      if (size <= 0) return;
      setScale(size / SLIDE_SIZE);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return scale;
}

/** Miniatura 1:1 de una slide 1080×1080; rellena el contenedor sin bandas. */
export function SlideThumbnail({
  slide,
  tokens,
  motif,
  contrast,
  legacyMoodDecor,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(containerRef);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} aria-hidden>
      {scale > 0 ? (
        <div
          className="pointer-events-none absolute top-0 left-0"
          style={{
            width: SLIDE_SIZE,
            height: SLIDE_SIZE,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <SlideRenderer
            slide={slide}
            tokens={tokens}
            motif={motif}
            contrast={contrast}
            legacyMoodDecor={legacyMoodDecor}
          />
        </div>
      ) : null}
    </div>
  );
}
