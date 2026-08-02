import type { CSSProperties } from "react";

type Props = {
  n: number | string;
  size?: number;
  tone?: "accent" | "accentAlt" | "surface" | "highlight";
  className?: string;
};

const tones: Record<NonNullable<Props["tone"]>, { bg: string; fg: string }> = {
  accent: { bg: "var(--slide-accent)", fg: "var(--slide-bg)" },
  accentAlt: { bg: "var(--slide-accent-alt)", fg: "var(--slide-bg)" },
  surface: { bg: "var(--slide-surface)", fg: "var(--slide-ink)" },
  highlight: { bg: "var(--slide-highlight)", fg: "var(--slide-bg)" },
};

export function NumberBadge({ n, size = 72, tone = "accent", className = "" }: Props) {
  const t = tones[tone];
  const style = {
    width: size,
    height: size,
    background: t.bg,
    color: t.fg,
  } as CSSProperties;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-[family-name:var(--slide-font-display)] text-[28px] font-bold ${className}`}
      style={style}
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}
