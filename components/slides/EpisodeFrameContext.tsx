"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Contrast, Motif } from "@/lib/schemas/episode-visual";

type EpisodeFrameValue = {
  motif: Motif;
  contrast: Contrast;
  legacyMoodDecor: boolean;
};

const EpisodeFrameContext = createContext<EpisodeFrameValue>({
  motif: "none",
  contrast: "soft",
  legacyMoodDecor: true,
});

export function EpisodeFrameProvider({
  motif,
  contrast,
  legacyMoodDecor,
  children,
}: EpisodeFrameValue & { children: ReactNode }) {
  return (
    <EpisodeFrameContext.Provider value={{ motif, contrast, legacyMoodDecor }}>
      {children}
    </EpisodeFrameContext.Provider>
  );
}

export function useEpisodeFrame(): EpisodeFrameValue {
  return useContext(EpisodeFrameContext);
}
