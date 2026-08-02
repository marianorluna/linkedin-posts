"use client";

import type { ReactNode } from "react";

type ItemToolbarProps = {
  label: string;
  index: number;
  total: number;
  min: number;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  children: ReactNode;
};

/** Shell for one repeatable item: reorder + remove around field children. */
export function RepeatableItemShell({
  label,
  index,
  total,
  min,
  onMove,
  onRemove,
  children,
}: ItemToolbarProps) {
  return (
    <div className="space-y-2 rounded-lg bg-white/5 p-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-[var(--muted)] hover:bg-white/15 disabled:opacity-35"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            title="Subir"
          >
            ↑
          </button>
          <button
            type="button"
            className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-[var(--muted)] hover:bg-white/15 disabled:opacity-35"
            onClick={() => onMove(1)}
            disabled={index >= total - 1}
            title="Bajar"
          >
            ↓
          </button>
          <button
            type="button"
            className="rounded bg-white/10 px-2 py-0.5 text-[11px] text-[var(--muted)] hover:bg-white/15 disabled:opacity-35"
            onClick={onRemove}
            disabled={total <= min}
            title="Quitar"
          >
            Quitar
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

type AddButtonProps = {
  label?: string;
  count: number;
  max: number;
  onAdd: () => void;
};

export function AddRepeatableItemButton({
  label = "Añadir elemento",
  count,
  max,
  onAdd,
}: AddButtonProps) {
  const atMax = count >= max;
  return (
    <div className="flex items-center justify-between gap-2 pt-1">
      <p className="text-[11px] text-[var(--muted)]">
        {count}/{max} elementos
      </p>
      <button
        type="button"
        className="rounded-lg bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] px-3 py-1.5 text-xs text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_32%,transparent)] disabled:cursor-not-allowed disabled:opacity-40"
        onClick={onAdd}
        disabled={atMax}
        title={atMax ? `Máximo ${max}` : label}
      >
        + {label}
      </button>
    </div>
  );
}
