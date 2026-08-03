"use client";

import { useEffect, useState } from "react";

/** Tailwind `md` — 768px */
export const MD_QUERY = "(min-width: 768px)";
/** Tailwind `lg` — 1024px */
export const LG_QUERY = "(min-width: 1024px)";

/**
 * Client media-query hook. Returns `undefined` until mount (SSR-safe).
 * Prefer treating `undefined` as desktop (`lg`) to avoid a mobile chrome flash.
 */
export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
