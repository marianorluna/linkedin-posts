import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "accent" | "accentAlt" | "surface" | "ink";
  className?: string;
};

const toneBg: Record<NonNullable<Props["tone"]>, string> = {
  accent: "var(--slide-accent)",
  accentAlt: "var(--slide-accent-alt)",
  surface: "var(--slide-surface)",
  ink: "var(--slide-ink)",
};

const toneFg: Record<NonNullable<Props["tone"]>, string> = {
  accent: "var(--slide-bg)",
  accentAlt: "var(--slide-bg)",
  surface: "var(--slide-ink)",
  ink: "var(--slide-bg)",
};

export function PillLabel({ children, tone = "accent", className = "" }: Props) {
  const style = {
    background: toneBg[tone],
    color: toneFg[tone],
  } as CSSProperties;

  return (
    <span
      className={`inline-flex items-center rounded-full px-7 py-3 font-[family-name:var(--slide-font-display)] text-[26px] font-semibold tracking-wide uppercase ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
