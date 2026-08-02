"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { hasPosition } from "@/lib/domain/layout";
import type { SlotLayout } from "@/lib/schemas/layout";
import { useLayoutEdit } from "./LayoutEditContext";

type Props = {
  id: string;
  layout?: SlotLayout;
  children: ReactNode;
  className?: string;
};

function slotStyle(layout?: SlotLayout): CSSProperties {
  const style: CSSProperties & Record<string, string | number | undefined> = {};
  if (hasPosition(layout)) {
    style.position = "absolute";
    style.left = layout?.x ?? 0;
    style.top = layout?.y ?? 0;
    style.zIndex = 20;
  }
  if (layout?.w !== undefined) style.width = layout.w;
  if (layout?.h !== undefined) style.height = layout.h;
  if (layout?.fontSize !== undefined) {
    style["--slot-fs"] = `${layout.fontSize}px`;
    style.fontSize = layout.fontSize;
  }
  if (layout?.bold !== undefined) style.fontWeight = layout.bold ? 700 : 500;
  if (layout?.italic !== undefined) style.fontStyle = layout.italic ? "italic" : "normal";
  return style;
}

export function LayoutSlot({ id, layout, children, className = "" }: Props) {
  const edit = useLayoutEdit();
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    mode: "move" | "resize";
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    originW: number;
    originH: number;
  } | null>(null);

  const selected = edit?.editMode && edit.selectedSlot === id;

  const ensurePosition = useCallback(() => {
    if (!edit || !ref.current) return layout ?? {};
    if (hasPosition(layout)) return layout ?? {};
    const frame = edit.measureFrame();
    if (!frame) return layout ?? {};
    const rect = ref.current.getBoundingClientRect();
    const scale = frame.width / 1080;
    return {
      ...layout,
      x: Math.round((rect.left - frame.left) / scale),
      y: Math.round((rect.top - frame.top) / scale),
      w: layout?.w ?? Math.round(rect.width / scale),
      h: layout?.h ?? Math.round(rect.height / scale),
    };
  }, [edit, layout]);

  function onPointerDown(e: ReactPointerEvent, mode: "move" | "resize") {
    if (!edit?.editMode) return;
    e.stopPropagation();
    e.preventDefault();
    edit.selectSlot(id);
    const base = ensurePosition();
    const frame = edit.measureFrame();
    if (!frame) return;
    const scale = frame.width / 1080;
    dragRef.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      originX: base.x ?? 0,
      originY: base.y ?? 0,
      originW: base.w ?? Math.round((ref.current?.getBoundingClientRect().width ?? 100) / scale),
      originH: base.h ?? Math.round((ref.current?.getBoundingClientRect().height ?? 100) / scale),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent) {
    if (!edit?.editMode || !dragRef.current) return;
    const frame = edit.measureFrame();
    if (!frame) return;
    const scale = frame.width / 1080;
    const dx = (e.clientX - dragRef.current.startX) / scale;
    const dy = (e.clientY - dragRef.current.startY) / scale;
    if (dragRef.current.mode === "move") {
      edit.updateSlot(id, {
        x: dragRef.current.originX + dx,
        y: dragRef.current.originY + dy,
        w: dragRef.current.originW,
        h: dragRef.current.originH,
      });
    } else {
      edit.updateSlot(id, {
        x: dragRef.current.originX,
        y: dragRef.current.originY,
        w: dragRef.current.originW + dx,
        h: dragRef.current.originH + dy,
      });
    }
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  const textOverride = layout?.fontSize !== undefined || layout?.bold !== undefined || layout?.italic !== undefined;

  return (
    <div
      ref={ref}
      data-slot={id}
      className={[
        className,
        textOverride ? "slot-text-override [&_.slot-text]:!text-[length:var(--slot-fs,inherit)]" : "",
        edit?.editMode ? "cursor-move" : "",
        selected ? "outline outline-2 outline-[var(--accent)] outline-offset-2" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={slotStyle(layout)}
      onPointerDown={(e) => {
        if (!edit?.editMode) return;
        if ((e.target as HTMLElement).dataset?.resizeHandle) return;
        onPointerDown(e, "move");
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={(e) => {
        if (!edit?.editMode) return;
        e.stopPropagation();
        edit.selectSlot(id);
      }}
    >
      {children}
      {edit?.editMode && selected ? (
        <button
          type="button"
          data-resize-handle="1"
          aria-label="Redimensionar"
          className="absolute bottom-0 right-0 z-50 h-5 w-5 translate-x-1/3 translate-y-1/3 cursor-se-resize rounded-sm border-2 border-white bg-[var(--accent)]"
          onPointerDown={(e) => onPointerDown(e, "resize")}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      ) : null}
    </div>
  );
}
