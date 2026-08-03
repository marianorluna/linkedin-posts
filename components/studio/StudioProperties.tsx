import type { ReactNode } from "react";

/** Scrollable properties stack for the studio right panel / drawer. */
export function StudioProperties({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}
