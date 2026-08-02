"use client";

import { SlideIcon } from "@/components/icons/SlideIcon";
import { ICON_IDS, type IconId } from "@/lib/icons/registry";

type Props = {
  label?: string;
  value?: IconId;
  onChange: (value: IconId | undefined) => void;
  allowEmpty?: boolean;
};

export function IconPicker({ label = "Icono", value, onChange, allowEmpty = true }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-[var(--muted)]">{label}</label>
        {allowEmpty && value ? (
          <button
            type="button"
            className="text-[11px] text-[var(--muted)] hover:text-[var(--accent)]"
            onClick={() => onChange(undefined)}
          >
            Quitar
          </button>
        ) : null}
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {ICON_IDS.map((id) => {
          const selected = value === id;
          return (
            <button
              key={id}
              type="button"
              title={id}
              onClick={() => onChange(id)}
              className={`flex h-9 items-center justify-center rounded-lg border ${
                selected
                  ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] text-[var(--accent)]"
                  : "border-[var(--panel-border)] bg-[#0b1015] text-[var(--muted)] hover:border-white/20"
              }`}
            >
              <SlideIcon id={id} size={18} strokeWidth={1.75} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
