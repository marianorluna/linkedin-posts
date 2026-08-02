"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SlotLayout } from "@/lib/schemas/layout";

export type LayoutEditContextValue = {
  editMode: boolean;
  selectedSlot: string | null;
  selectSlot: (id: string | null) => void;
  updateSlot: (id: string, patch: SlotLayout) => void;
  measureFrame: () => DOMRect | null;
};

const LayoutEditContext = createContext<LayoutEditContextValue | null>(null);

export function LayoutEditProvider({
  value,
  children,
}: {
  value: LayoutEditContextValue;
  children: ReactNode;
}) {
  return <LayoutEditContext.Provider value={value}>{children}</LayoutEditContext.Provider>;
}

export function useLayoutEdit(): LayoutEditContextValue | null {
  return useContext(LayoutEditContext);
}
