"use client";

import {
  DENSITIES,
  FONT_PAIRS,
  MOODS,
  type BrandTokens,
  type Density,
  type FontPair,
  type Mood,
  deepMergeBrandTokens,
  resolveFontPair,
} from "@/lib/design-tokens";

export type BrandKitOption = {
  id: string;
  name: string;
  tokens: BrandTokens;
};

type PresetOption = { key: string; name: string };

type Props = {
  tokens: BrandTokens;
  kits: BrandKitOption[];
  presets: PresetOption[];
  selectedKitId: string | null;
  onTokensChange: (tokens: BrandTokens) => void;
  onSelectKit: (kitId: string) => void;
  onApplyPreset: (presetKey: string) => void;
};

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isHex = value.startsWith("#") && (value.length === 7 || value.length === 4);
  return (
    <div>
      <label className="text-xs text-[var(--muted)]">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        {isHex ? (
          <input
            type="color"
            value={value.length === 4 ? expandHex(value) : value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-10 cursor-pointer rounded border border-[var(--panel-border)] bg-transparent"
          />
        ) : null}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-1.5 text-xs"
        />
      </div>
    </div>
  );
}

function expandHex(short: string): string {
  if (short.length !== 4) return short;
  const [, r, g, b] = short;
  return `#${r}${r}${g}${g}${b}${b}`;
}

export function StylePanel({
  tokens,
  kits,
  presets,
  selectedKitId,
  onTokensChange,
  onSelectKit,
  onApplyPreset,
}: Props) {
  function patchColors(partial: Partial<BrandTokens["colors"]>) {
    onTokensChange(
      deepMergeBrandTokens({
        ...tokens,
        colors: { ...tokens.colors, ...partial },
      }),
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-[var(--muted)]">BrandKit</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={selectedKitId ?? ""}
          onChange={(e) => {
            if (e.target.value) onSelectKit(e.target.value);
          }}
        >
          <option value="" disabled>
            Elegir kit…
          </option>
          {kits.map((kit) => (
            <option key={kit.id} value={kit.id}>
              {kit.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Aplicar preset</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          defaultValue=""
          onChange={(e) => {
            if (!e.target.value) return;
            onApplyPreset(e.target.value);
            e.target.value = "";
          }}
        >
          <option value="">Elegir preset…</option>
          {presets.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Mood</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={tokens.mood}
          onChange={(e) =>
            onTokensChange(deepMergeBrandTokens({ ...tokens, mood: e.target.value as Mood }))
          }
        >
          {MOODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Tipografía</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={tokens.fonts.pair}
          onChange={(e) => {
            const pair = e.target.value as FontPair;
            onTokensChange(
              deepMergeBrandTokens({
                ...tokens,
                fonts: resolveFontPair(pair),
              }),
            );
          }}
        >
          {FONT_PAIRS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-[var(--muted)]">Densidad</label>
        <select
          className="mt-1 w-full rounded-lg border border-[var(--panel-border)] bg-[#0b1015] px-2 py-2 text-sm"
          value={tokens.density}
          onChange={(e) =>
            onTokensChange(
              deepMergeBrandTokens({ ...tokens, density: e.target.value as Density }),
            )
          }
        >
          {DENSITIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ColorField
          label="Accent"
          value={tokens.colors.accent}
          onChange={(v) => patchColors({ accent: v })}
        />
        <ColorField
          label="Accent alt"
          value={tokens.colors.accentAlt}
          onChange={(v) => patchColors({ accentAlt: v })}
        />
        <ColorField label="Fondo" value={tokens.colors.bg} onChange={(v) => patchColors({ bg: v })} />
        <ColorField label="Texto" value={tokens.colors.ink} onChange={(v) => patchColors({ ink: v })} />
        <ColorField
          label="Muted"
          value={tokens.colors.inkMuted}
          onChange={(v) => patchColors({ inkMuted: v })}
        />
        <ColorField
          label="Highlight"
          value={tokens.colors.highlight}
          onChange={(v) => patchColors({ highlight: v })}
        />
      </div>
    </div>
  );
}
