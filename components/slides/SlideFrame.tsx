import type { CSSProperties, ReactNode } from "react";
import { SLIDE_SIZE, tokensToCssVars, type BrandTokens } from "@/lib/design-tokens";

type SlideFrameProps = {
  tokens: BrandTokens;
  children: ReactNode;
  className?: string;
  padless?: boolean;
};

function MoodBackground({ mood }: { mood: BrandTokens["mood"] }) {
  if (mood === "light-flat") {
    return (
      <>
        <div className="absolute inset-0" style={{ background: "var(--slide-bg)" }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--slide-stroke) 1px, transparent 1px), linear-gradient(90deg, var(--slide-stroke) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </>
    );
  }

  if (mood === "bold-blocks") {
    return (
      <>
        <div className="absolute inset-0" style={{ background: "var(--slide-bg)" }} />
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-[420px] w-[420px] rounded-full opacity-90"
          style={{ background: "color-mix(in srgb, var(--slide-accent) 22%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-[380px] w-[380px] rounded-full opacity-90"
          style={{ background: "color-mix(in srgb, var(--slide-accent-alt) 18%, transparent)" }}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 12% 18%, color-mix(in srgb, var(--slide-accent) 18%, transparent), transparent 55%),
            radial-gradient(ellipse 70% 50% at 88% 82%, color-mix(in srgb, var(--slide-surface) 80%, transparent), transparent 50%),
            linear-gradient(160deg, var(--slide-bg) 0%, var(--slide-bg-elevated) 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--slide-stroke) 1px, transparent 1px), linear-gradient(90deg, var(--slide-stroke) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </>
  );
}

export function SlideFrame({ tokens, children, className = "", padless = false }: SlideFrameProps) {
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
      <MoodBackground mood={tokens.mood} />
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
