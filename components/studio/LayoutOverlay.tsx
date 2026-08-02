"use client";

type Props = {
  enabled: boolean;
  onBackgroundClick: () => void;
};

/** Chrome de edición sobre el preview (la interacción vive en LayoutSlot). */
export function LayoutOverlay({ enabled, onBackgroundClick }: Props) {
  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 rounded-xl ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-black/40"
      aria-hidden
    >
      <button
        type="button"
        className="pointer-events-auto absolute left-2 top-2 rounded-md bg-[var(--accent)] px-2 py-1 text-[11px] font-medium text-[#0b1015]"
        onClick={onBackgroundClick}
      >
        Editar layout · click vacío para deseleccionar
      </button>
    </div>
  );
}
