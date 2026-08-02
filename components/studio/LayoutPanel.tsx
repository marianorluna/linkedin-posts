"use client";

import { useLayoutEffect, useState } from "react";
import {
  clearLayout,
  clearSlot,
  effectiveSlotBox,
  getSlot,
  isIconSlot,
  isTextSlot,
  replaceSlot,
  seedGeometry,
  slotsForTemplate,
  type SlotBox,
} from "@/lib/domain/layout";
import type { SlotLayout } from "@/lib/schemas/layout";
import type { SlideContent } from "@/lib/schemas/carousel";

type Props = {
  slide: SlideContent;
  selectedSlot: string | null;
  onSelectSlot: (id: string | null) => void;
  onChange: (slide: SlideContent) => void;
  /** Mide la caja actual del slot en coords 1080 (flujo natural o absoluto). */
  measureSlot?: (id: string) => SlotBox | null;
};

const GEO_KEYS = new Set<keyof SlotLayout>(["x", "y", "w", "h"]);

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | "";
  onChange: (v: number | undefined) => void;
}) {
  return (
    <div>
      <label className="text-[11px] text-[var(--muted)]">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(undefined);
            return;
          }
          onChange(Number(raw));
        }}
        className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-1.5 text-sm"
      />
    </div>
  );
}

function applyField(
  current: SlotLayout | undefined,
  key: keyof SlotLayout,
  value: SlotLayout[keyof SlotLayout] | undefined,
): SlotLayout | undefined {
  const next: SlotLayout = { ...(current ?? {}) };
  if (value === undefined) {
    delete next[key];
  } else {
    Object.assign(next, { [key]: value });
  }
  return Object.keys(next).length ? next : undefined;
}

export function LayoutPanel({
  slide,
  selectedSlot,
  onSelectSlot,
  onChange,
  measureSlot,
}: Props) {
  const slots = slotsForTemplate(slide.template);
  const active = selectedSlot && slots.includes(selectedSlot) ? selectedSlot : (slots[0] ?? null);
  const current = active ? getSlot(slide.layout, active) : undefined;
  const textCapable = active ? isTextSlot(active) : false;
  const iconCapable = active ? isIconSlot(active) : false;
  const weightCapable = textCapable || iconCapable;

  const [measured, setMeasured] = useState<SlotBox | null>(null);

  useLayoutEffect(() => {
    if (!active || !measureSlot) {
      setMeasured(null);
      return;
    }
    setMeasured(measureSlot(active));
  }, [active, slide, measureSlot]);

  const box = effectiveSlotBox(current, measured);

  function writeField<K extends keyof SlotLayout>(key: K, value: SlotLayout[K] | undefined) {
    if (!active) return;
    const base =
      GEO_KEYS.has(key) && value !== undefined ? seedGeometry(current, measured) : (current ?? {});
    const nextSlot = applyField(base, key, value);
    onChange({
      ...slide,
      layout: replaceSlot(slide.layout, active, nextSlot),
    } as SlideContent);
  }

  /** Primer clic desde default (undefined) quita peso: tipografías e iconos ya vienen pesados. */
  function toggleBold() {
    if (current?.bold === undefined) {
      writeField("bold", false);
      return;
    }
    writeField("bold", !current.bold);
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-[var(--muted)]">Slot</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={active ?? ""}
          onChange={(e) => onSelectSlot(e.target.value || null)}
        >
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      {active ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            <NumField label="X" value={box.x} onChange={(v) => writeField("x", v)} />
            <NumField label="Y" value={box.y} onChange={(v) => writeField("y", v)} />
            <NumField label="Ancho (W)" value={box.w} onChange={(v) => writeField("w", v)} />
            <NumField label="Alto (H)" value={box.h} onChange={(v) => writeField("h", v)} />
          </div>

          {textCapable ? (
            <NumField
              label="Tamaño texto"
              value={current?.fontSize ?? ""}
              onChange={(v) => writeField("fontSize", v)}
            />
          ) : null}

          {weightCapable ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={toggleBold}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold ${
                  current?.bold === true
                    ? "bg-[var(--accent)] text-[#0b1015]"
                    : current?.bold === false
                      ? "bg-white/10 text-[var(--muted)] ring-1 ring-[var(--panel-border)]"
                      : "bg-white/10 text-[var(--muted)]"
                }`}
                title={
                  iconCapable
                    ? "Grosor del trazo del icono (off = fino, on = grueso)"
                    : "Peso tipográfico (off = normal, on = negrita)"
                }
              >
                {iconCapable ? "Grosor" : "Negrita"}
                {current?.bold === false ? " · fino" : current?.bold === true ? " · grueso" : ""}
              </button>
              {textCapable ? (
                <button
                  type="button"
                  onClick={() => writeField("italic", !current?.italic)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm italic ${
                    current?.italic
                      ? "bg-[var(--accent)] text-[#0b1015]"
                      : "bg-white/10 text-[var(--muted)]"
                  }`}
                >
                  Cursiva
                </button>
              ) : null}
            </div>
          ) : null}

          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs"
              onClick={() =>
                onChange({ ...slide, layout: clearSlot(slide.layout, active) } as SlideContent)
              }
            >
              Reset slot
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs"
              onClick={() => onChange({ ...slide, layout: clearLayout() } as SlideContent)}
            >
              Reset slide
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
