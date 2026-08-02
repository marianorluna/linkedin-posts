import type { CSSProperties, ReactNode } from "react";
import { NumberBadge } from "./NumberBadge";

type Props = {
  index: number;
  title: string;
  detail?: string;
  tone?: "accent" | "accentAlt" | "highlight" | "surface";
  trailing?: ReactNode;
  className?: string;
};

const barColors: Record<NonNullable<Props["tone"]>, string> = {
  accent: "var(--slide-accent)",
  accentAlt: "var(--slide-accent-alt)",
  highlight: "var(--slide-highlight)",
  surface: "var(--slide-surface)",
};

export function RibbonBar({
  index,
  title,
  detail,
  tone = "accent",
  trailing,
  className = "",
}: Props) {
  const style = {
    background: barColors[tone],
  } as CSSProperties;

  return (
    <div
      className={`relative flex items-center gap-5 rounded-[var(--slide-radius-md)] py-5 pl-5 pr-6 shadow-[0_10px_0_rgba(0,0,0,0.08)] ${className}`}
      style={style}
    >
      <NumberBadge n={index} tone="surface" size={64} />
      <div className="min-w-0 flex-1">
        <p
          className="truncate font-[family-name:var(--slide-font-display)] text-[30px] font-bold uppercase tracking-wide"
          style={{ color: "var(--slide-bg)" }}
        >
          {title}
        </p>
        {detail ? (
          <p
            className="mt-1 line-clamp-2 font-[family-name:var(--slide-font-body)] text-[20px]"
            style={{ color: "color-mix(in srgb, var(--slide-bg) 85%, transparent)" }}
          >
            {detail}
          </p>
        ) : null}
      </div>
      {trailing}
    </div>
  );
}
