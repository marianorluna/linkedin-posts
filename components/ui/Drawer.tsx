"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type DrawerSide = "left" | "right";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title: string;
  children: ReactNode;
  /** Optional id for aria-controls from the trigger */
  id?: string;
  /** Panel width classes */
  widthClassName?: string;
};

function subscribe() {
  return () => undefined;
}

function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function Drawer({
  open,
  onClose,
  side = "left",
  title,
  children,
  id,
  widthClassName = "w-[min(100vw-2.5rem,20rem)]",
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useIsClient();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const sideClasses = side === "left" ? "left-0 border-r" : "right-0 border-l";

  return createPortal(
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px] drawer-motion"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={[
          "absolute inset-y-0 flex max-h-dvh flex-col border-[var(--panel-border)] bg-[var(--panel)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] outline-none",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          side === "left"
            ? "pl-[env(safe-area-inset-left)]"
            : "pr-[env(safe-area-inset-right)]",
          "drawer-motion drawer-panel-in",
          widthClassName,
          sideClasses,
          side === "left" ? "drawer-from-left" : "drawer-from-right",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--panel-border)] px-4 py-3">
          <h2
            id={titleId}
            className="font-[family-name:var(--font-display)] text-lg tracking-tight"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--panel-border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="studio-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
