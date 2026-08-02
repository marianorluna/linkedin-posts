"use client";

import type { CSSProperties, ReactNode } from "react";
import { SLIDE_SIZE, tokensToCssVars, type BrandTokens } from "@/lib/design-tokens";
import type { Contrast, Motif } from "@/lib/schemas/episode-visual";
import { useEpisodeFrame } from "./EpisodeFrameContext";

type SlideFrameProps = {
  tokens: BrandTokens;
  children: ReactNode;
  className?: string;
  padless?: boolean;
  motif?: Motif;
  contrast?: Contrast;
  legacyMoodDecor?: boolean;
};

/** Base de color/atmósfera del mood. Sin figuras si el episodio controla el motivo. */
function MoodBackground({
  mood,
  legacyDecor,
}: {
  mood: BrandTokens["mood"];
  legacyDecor: boolean;
}) {
  if (mood === "light-flat") {
    return (
      <>
        <div className="absolute inset-0" style={{ background: "var(--slide-bg)" }} />
        {legacyDecor ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(var(--slide-stroke) 1px, transparent 1px), linear-gradient(90deg, var(--slide-stroke) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        ) : null}
      </>
    );
  }

  if (mood === "bold-blocks") {
    return (
      <>
        <div className="absolute inset-0" style={{ background: "var(--slide-bg)" }} />
        {legacyDecor ? (
          <>
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-[420px] w-[420px] rounded-full opacity-90"
              style={{ background: "color-mix(in srgb, var(--slide-accent) 22%, transparent)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-[380px] w-[380px] rounded-full opacity-90"
              style={{ background: "color-mix(in srgb, var(--slide-accent-alt) 18%, transparent)" }}
            />
          </>
        ) : null}
      </>
    );
  }

  // dark-wire
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: legacyDecor
            ? `
            radial-gradient(ellipse 80% 60% at 12% 18%, color-mix(in srgb, var(--slide-accent) 18%, transparent), transparent 55%),
            radial-gradient(ellipse 70% 50% at 88% 82%, color-mix(in srgb, var(--slide-surface) 80%, transparent), transparent 50%),
            linear-gradient(160deg, var(--slide-bg) 0%, var(--slide-bg-elevated) 100%)
          `
            : `linear-gradient(160deg, var(--slide-bg) 0%, var(--slide-bg-elevated) 100%)`,
        }}
      />
      {legacyDecor ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--slide-stroke) 1px, transparent 1px), linear-gradient(90deg, var(--slide-stroke) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      ) : null}
    </>
  );
}

function MotifLayer({ motif, contrast }: { motif: Motif; contrast: Contrast }) {
  if (motif === "none") return null;

  const hard = contrast === "hard";
  const accentPct = hard ? 28 : 16;
  const altPct = hard ? 22 : 12;

  if (motif === "orbs") {
    return (
      <>
        <div
          className="pointer-events-none absolute -right-20 top-10 h-[480px] w-[480px] rounded-full"
          style={{
            background: `color-mix(in srgb, var(--slide-accent) ${accentPct}%, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-24 h-[400px] w-[400px] rounded-full"
          style={{
            background: `color-mix(in srgb, var(--slide-accent-alt) ${altPct}%, transparent)`,
          }}
        />
      </>
    );
  }

  if (motif === "orbs-tl") {
    return (
      <>
        <div
          className="pointer-events-none absolute -left-24 -top-16 h-[500px] w-[500px] rounded-full"
          style={{
            background: `color-mix(in srgb, var(--slide-accent) ${accentPct}%, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full"
          style={{
            background: `color-mix(in srgb, var(--slide-accent-alt) ${altPct}%, transparent)`,
          }}
        />
      </>
    );
  }

  if (motif === "orbs-center") {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, var(--slide-accent) ${hard ? 26 : 16}%, transparent) 0%, transparent 68%)`,
        }}
      />
    );
  }

  if (motif === "arcs") {
    return (
      <>
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full"
          style={{
            border: `${hard ? 48 : 36}px solid color-mix(in srgb, var(--slide-accent) ${hard ? 40 : 26}%, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-48 -left-48 h-[520px] w-[520px] rounded-full"
          style={{
            border: `${hard ? 40 : 28}px solid color-mix(in srgb, var(--slide-accent-alt) ${hard ? 32 : 20}%, transparent)`,
          }}
        />
      </>
    );
  }

  if (motif === "blocks") {
    return (
      <>
        <div
          className="pointer-events-none absolute -right-8 top-16 h-[280px] w-[280px] rotate-12 rounded-[48px]"
          style={{
            background: `color-mix(in srgb, var(--slide-accent) ${accentPct}%, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute -left-12 bottom-20 h-[220px] w-[320px] -rotate-6 rounded-[40px]"
          style={{
            background: `color-mix(in srgb, var(--slide-highlight) ${altPct}%, transparent)`,
          }}
        />
      </>
    );
  }

  if (motif === "dots") {
    const dots = [
      { t: "12%", l: "8%", s: 28 },
      { t: "18%", l: "78%", s: 18 },
      { t: "72%", l: "12%", s: 22 },
      { t: "80%", l: "70%", s: 36 },
      { t: "42%", l: "88%", s: 14 },
      { t: "58%", l: "6%", s: 16 },
    ] as const;
    return (
      <>
        {dots.map((d, i) => (
          <div
            key={`${d.t}-${d.l}`}
            className="pointer-events-none absolute rounded-full"
            style={{
              top: d.t,
              left: d.l,
              width: d.s,
              height: d.s,
              background:
                i % 2 === 0
                  ? `color-mix(in srgb, var(--slide-accent) ${hard ? 55 : 35}%, transparent)`
                  : `color-mix(in srgb, var(--slide-accent-alt) ${hard ? 45 : 28}%, transparent)`,
            }}
          />
        ))}
      </>
    );
  }

  if (motif === "grid") {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: hard ? 0.22 : 0.12,
          backgroundImage:
            "linear-gradient(var(--slide-stroke) 1px, transparent 1px), linear-gradient(90deg, var(--slide-stroke) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    );
  }

  if (motif === "ribbons") {
    return (
      <>
        <div
          className="pointer-events-none absolute -left-10 top-24 h-16 w-[120%] -rotate-6"
          style={{
            background: `color-mix(in srgb, var(--slide-accent) ${hard ? 35 : 22}%, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-40 h-12 w-[110%] rotate-3"
          style={{
            background: `color-mix(in srgb, var(--slide-highlight) ${hard ? 28 : 16}%, transparent)`,
          }}
        />
      </>
    );
  }

  if (motif === "bars") {
    return (
      <>
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-6"
          style={{ background: "var(--slide-accent)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-6 w-full"
          style={{
            background: `color-mix(in srgb, var(--slide-accent-alt) ${hard ? 70 : 40}%, transparent)`,
          }}
        />
      </>
    );
  }

  // diagonal
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--slide-accent) ${hard ? 24 : 14}%, transparent) 0%, transparent 42%, transparent 58%, color-mix(in srgb, var(--slide-accent-alt) ${hard ? 20 : 12}%, transparent) 100%)`,
      }}
    />
  );
}

export function SlideFrame({
  tokens,
  children,
  className = "",
  padless = false,
  motif: motifProp,
  contrast: contrastProp,
  legacyMoodDecor: legacyProp,
}: SlideFrameProps) {
  const episode = useEpisodeFrame();
  const motif = motifProp ?? episode.motif;
  const contrast = contrastProp ?? episode.contrast;
  const legacyMoodDecor = legacyProp ?? episode.legacyMoodDecor;

  const style = {
    ...tokensToCssVars(tokens),
    width: SLIDE_SIZE,
    height: SLIDE_SIZE,
    fontFamily: "var(--slide-font-body)",
  } as CSSProperties;

  return (
    <div
      data-slide-frame
      className={`relative overflow-hidden text-[var(--slide-ink)] ${className}`}
      style={style}
    >
      <MoodBackground mood={tokens.mood} legacyDecor={legacyMoodDecor} />
      <MotifLayer motif={motif} contrast={contrast} />
      <div
        className={`relative z-10 flex h-full w-full flex-col overflow-hidden ${padless ? "" : "p-[var(--slide-pad)]"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function SlideEyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="slot-text mb-5 font-[family-name:var(--slide-font-mono)] text-[22px] tracking-[0.18em] uppercase"
      style={{ color: "var(--slide-accent)" }}
    >
      {children}
    </p>
  );
}

export function SlideHeadline({ children }: { children: ReactNode }) {
  return (
    <h1
      className="slot-text font-[family-name:var(--slide-font-display)] text-[64px] leading-[1.05] tracking-[-0.03em]"
      style={{ color: "var(--slide-ink)" }}
    >
      {children}
    </h1>
  );
}

export function SlideBody({ children }: { children: ReactNode }) {
  return (
    <p
      className="slot-text mt-6 max-w-[820px] font-[family-name:var(--slide-font-body)] text-[28px] leading-[1.35]"
      style={{ color: "var(--slide-ink-muted)" }}
    >
      {children}
    </p>
  );
}
