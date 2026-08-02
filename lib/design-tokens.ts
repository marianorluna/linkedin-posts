export const SLIDE_SIZE = 1080 as const;

export const defaultBrandTokens = {
  colors: {
    bg: "#0F1419",
    bgElevated: "#1A222C",
    surface: "#243040",
    ink: "#F4F6F8",
    inkMuted: "#9AA7B5",
    accent: "#3DDC97",
    accentSoft: "rgba(61, 220, 151, 0.16)",
    stroke: "rgba(244, 246, 248, 0.18)",
    barTrack: "rgba(244, 246, 248, 0.08)",
    danger: "#FF6B6B",
  },
  fonts: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },
  radii: {
    sm: 8,
    md: 16,
    lg: 28,
    phone: 48,
  },
  strokeWidth: 1.5,
} as const;

export type BrandTokens = typeof defaultBrandTokens;

export function tokensToCssVars(tokens: BrandTokens = defaultBrandTokens): Record<string, string> {
  return {
    "--slide-bg": tokens.colors.bg,
    "--slide-bg-elevated": tokens.colors.bgElevated,
    "--slide-surface": tokens.colors.surface,
    "--slide-ink": tokens.colors.ink,
    "--slide-ink-muted": tokens.colors.inkMuted,
    "--slide-accent": tokens.colors.accent,
    "--slide-accent-soft": tokens.colors.accentSoft,
    "--slide-stroke": tokens.colors.stroke,
    "--slide-bar-track": tokens.colors.barTrack,
    "--slide-danger": tokens.colors.danger,
    "--slide-radius-sm": `${tokens.radii.sm}px`,
    "--slide-radius-md": `${tokens.radii.md}px`,
    "--slide-radius-lg": `${tokens.radii.lg}px`,
    "--slide-radius-phone": `${tokens.radii.phone}px`,
    "--slide-stroke-width": `${tokens.strokeWidth}px`,
  };
}
