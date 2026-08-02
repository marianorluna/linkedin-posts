"use client";

import { useState, type ReactNode, type SyntheticEvent } from "react";

type Props = {
  title: string;
  defaultOpen?: boolean;
  hint?: string;
  children: ReactNode;
};

/** Sección lateral colapsable (Compound: summary + body) para reducir scroll del aside. */
export function CollapsibleSection({ title, defaultOpen = false, hint, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  function handleToggle(e: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(e.currentTarget.open);
  }

  return (
    <details
      open={open}
      onToggle={handleToggle}
      className="group rounded-xl border border-[var(--panel-border)] bg-[#0b1015]/40"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium select-none marker:content-none [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-150 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="space-y-3 border-t border-[var(--panel-border)] px-3 pb-3 pt-3">
        {hint ? <p className="text-[11px] text-[var(--muted)]">{hint}</p> : null}
        {children}
      </div>
    </details>
  );
}
