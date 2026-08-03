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
        className="pointer-events-auto absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-md bg-[var(--accent)] px-2 py-1 text-[11px] font-medium text-[#0b1015]"
        onClick={onBackgroundClick}
      >
        <span className="sm:hidden">Layout · tap vacío</span>
        <span className="hidden sm:inline">Editar layout · click vacío para deseleccionar</span>
      </button>
    </div>
  );
}
