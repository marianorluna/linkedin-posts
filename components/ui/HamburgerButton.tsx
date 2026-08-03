"use client";

type HamburgerButtonProps = {
  open: boolean;
  onClick: () => void;
  controls: string;
  labelOpen?: string;
  labelClose?: string;
  className?: string;
};

export function HamburgerButton({
  open,
  onClick,
  controls,
  labelOpen = "Abrir menú",
  labelClose = "Cerrar menú",
  className = "",
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? labelClose : labelOpen}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--panel-border)] text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] ${className}`}
    >
      <span className="relative block h-3.5 w-4" aria-hidden="true">
        <span
          className={`absolute left-0 block h-0.5 w-4 rounded-full bg-current transition duration-200 ${
            open ? "top-1.5 rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute top-1.5 left-0 block h-0.5 w-4 rounded-full bg-current transition duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 w-4 rounded-full bg-current transition duration-200 ${
            open ? "top-1.5 -rotate-45" : "top-3"
          }`}
        />
      </span>
    </button>
  );
}
