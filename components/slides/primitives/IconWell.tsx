import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  size?: number;
  tone?: "soft" | "solid" | "outline";
  className?: string;
};

export function IconWell({ children, size = 72, tone = "soft", className = "" }: Props) {
  const style = {
    width: size,
    height: size,
    ...(tone === "soft"
      ? { background: "var(--slide-accent-soft)", color: "var(--slide-ink)" }
      : tone === "solid"
        ? { background: "var(--slide-accent)", color: "var(--slide-bg)" }
        : {
            background: "transparent",
            color: "var(--slide-ink)",
            border: "var(--slide-stroke-width) solid var(--slide-stroke)",
          }),
  } as CSSProperties;

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-[var(--slide-radius-md)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
