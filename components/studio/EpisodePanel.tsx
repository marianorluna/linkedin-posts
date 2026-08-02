"use client";

import { DENSITIES, DENSITY_LABELS, MOODS, MOOD_LABELS, type Density, type Mood } from "@/lib/design-tokens";
import {
  ACCENT_SHIFTS,
  CONTRASTS,
  MOTIF_LABELS,
  MOTIFS,
  type AccentShift,
  type Contrast,
  type EpisodeVisual,
  type Motif,
} from "@/lib/schemas/episode-visual";

type Props = {
  visual: EpisodeVisual | undefined;
  onChange: (visual: EpisodeVisual | undefined) => void;
};

function patchVisual(
  current: EpisodeVisual | undefined,
  patch: Partial<EpisodeVisual>,
): EpisodeVisual {
  return { ...current, ...patch };
}

export function EpisodePanel({ visual, onChange }: Props) {
  const motif = visual?.motif ?? "";
  const accentShift = visual?.accentShift ?? "";
  const contrast = visual?.contrast ?? "";
  const mood = visual?.mood ?? "";
  const density = visual?.density ?? "";

  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--muted)]">
        Figuras de fondo de este carrusel. Elige &quot;Sin figuras&quot; para fondo plano. Vacío =
        decoración del BrandKit.
      </p>

      <div>
        <label className="text-xs text-[var(--muted)]">Motivo de fondo</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={motif}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              const next = { ...visual };
              delete next.motif;
              onChange(Object.keys(next).length ? next : undefined);
              return;
            }
            onChange(patchVisual(visual, { motif: value as Motif }));
          }}
        >
          <option value="">(BrandKit / legacy)</option>
          {MOTIFS.map((m) => (
            <option key={m} value={m}>
              {MOTIF_LABELS[m]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Acento</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={accentShift}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              const next = { ...visual };
              delete next.accentShift;
              onChange(Object.keys(next).length ? next : undefined);
              return;
            }
            onChange(patchVisual(visual, { accentShift: value as AccentShift }));
          }}
        >
          <option value="">brand (default)</option>
          {ACCENT_SHIFTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Contraste</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={contrast}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              const next = { ...visual };
              delete next.contrast;
              onChange(Object.keys(next).length ? next : undefined);
              return;
            }
            onChange(patchVisual(visual, { contrast: value as Contrast }));
          }}
        >
          <option value="">soft (default)</option>
          {CONTRASTS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Mood override</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={mood}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              const next = { ...visual };
              delete next.mood;
              onChange(Object.keys(next).length ? next : undefined);
              return;
            }
            onChange(patchVisual(visual, { mood: value as Mood }));
          }}
        >
          <option value="">(BrandKit)</option>
          {MOODS.map((m) => (
            <option key={m} value={m}>
              {MOOD_LABELS[m]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Densidad override</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={density}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              const next = { ...visual };
              delete next.density;
              onChange(Object.keys(next).length ? next : undefined);
              return;
            }
            onChange(patchVisual(visual, { density: value as Density }));
          }}
        >
          <option value="">(BrandKit)</option>
          {DENSITIES.map((d) => (
            <option key={d} value={d}>
              {DENSITY_LABELS[d]}
            </option>
          ))}
        </select>
      </div>

      {visual ? (
        <button
          type="button"
          className="w-full rounded-lg border border-[var(--panel-border)] px-3 py-2 text-xs text-[var(--muted)] hover:bg-white/5"
          onClick={() => onChange(undefined)}
        >
          Quitar skin de episodio
        </button>
      ) : null}
    </div>
  );
}
