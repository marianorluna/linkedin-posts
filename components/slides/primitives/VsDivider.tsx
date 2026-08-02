import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export function VsDivider({ children, className = "" }: Props) {
  return (
    <div
      className={`relative flex w-[120px] shrink-0 flex-col items-center justify-center ${className}`}
      style={{
        background: "var(--slide-bg-elevated)",
        boxShadow: "0 0 0 1px var(--slide-stroke), 8px 0 24px rgba(0,0,0,0.06), -8px 0 24px rgba(0,0,0,0.06)",
      }}
    >
      <span
        className="mb-6 font-[family-name:var(--slide-font-display)] text-[42px] font-extrabold leading-none"
        style={{
          color: "var(--slide-ink)",
          textShadow: "3px 3px 0 color-mix(in srgb, var(--slide-accent-alt) 70%, transparent)",
        }}
      >
        Vs
      </span>
      {children}
    </div>
  );
}
