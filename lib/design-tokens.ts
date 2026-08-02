export const SLIDE_SIZE = 1080 as const;

export const FONT_PAIRS = ["syne-instrument", "space-grotesk", "dm-sans"] as const;
export type FontPair = (typeof FONT_PAIRS)[number];

export const MOODS = ["dark-wire", "light-flat", "bold-blocks"] as const;
export type Mood = (typeof MOODS)[number];

export const DENSITIES = ["air", "compact"] as const;
export type Density = (typeof DENSITIES)[number];

export type BrandColors = {
  bg: string;
  bgElevated: string;
  surface: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentSoft: string;
  accentAlt: string;
  highlight: string;
  stroke: string;
  barTrack: string;
  danger: string;
};

export type BrandTokens = {
  colors: BrandColors;
  fonts: {
    pair: FontPair;
    display: string;
    body: string;
    mono: string;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    phone: number;
  };
  strokeWidth: number;
  iconStroke: number;
  mood: Mood;
  density: Density;
};

const FONT_PAIR_VARS: Record<FontPair, { display: string; body: string; mono: string }> = {
  "syne-instrument": {
    display: "var(--font-display)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },
  "space-grotesk": {
    display: "var(--font-space)",
    body: "var(--font-space)",
    mono: "var(--font-mono)",
  },
  "dm-sans": {
    display: "var(--font-dm)",
    body: "var(--font-dm)",
    mono: "var(--font-mono)",
  },
};

export const defaultBrandTokens: BrandTokens = {
  colors: {
    bg: "#0F1419",
    bgElevated: "#1A222C",
    surface: "#243040",
    ink: "#F4F6F8",
    inkMuted: "#9AA7B5",
    accent: "#3DDC97",
    accentSoft: "rgba(61, 220, 151, 0.16)",
    accentAlt: "#FF6B6B",
    highlight: "#F5C542",
    stroke: "rgba(244, 246, 248, 0.18)",
    barTrack: "rgba(244, 246, 248, 0.08)",
    danger: "#FF6B6B",
  },
  fonts: {
    pair: "syne-instrument",
    ...FONT_PAIR_VARS["syne-instrument"],
  },
  radii: {
    sm: 8,
    md: 16,
    lg: 28,
    phone: 48,
  },
  strokeWidth: 1.5,
  iconStroke: 2,
  mood: "dark-wire",
  density: "air",
};

export const BRAND_PRESETS: Record<string, { name: string; tokens: BrandTokens }> = {
  "wireframe-studio": {
    name: "Wireframe Studio",
    tokens: defaultBrandTokens,
  },
  "light-infographic": {
    name: "Light Infographic",
    tokens: {
      colors: {
        bg: "#F4F6F8",
        bgElevated: "#FFFFFF",
        surface: "#E4EAF1",
        ink: "#12181F",
        inkMuted: "#5A6675",
        accent: "#2AB374",
        accentSoft: "rgba(42, 179, 116, 0.18)",
        accentAlt: "#E84C4C",
        highlight: "#F0B429",
        stroke: "rgba(18, 24, 31, 0.12)",
        barTrack: "rgba(18, 24, 31, 0.08)",
        danger: "#E84C4C",
      },
      fonts: {
        pair: "space-grotesk",
        ...FONT_PAIR_VARS["space-grotesk"],
      },
      radii: { sm: 12, md: 20, lg: 32, phone: 48 },
      strokeWidth: 2,
      iconStroke: 2.25,
      mood: "bold-blocks",
      density: "compact",
    },
  },
  "bold-compare": {
    name: "Bold Compare",
    tokens: {
      colors: {
        bg: "#FFFFFF",
        bgElevated: "#F2F4F7",
        surface: "#1A222C",
        ink: "#12181F",
        inkMuted: "#5A6675",
        accent: "#2AB374",
        accentSoft: "rgba(42, 179, 116, 0.18)",
        accentAlt: "#E84C4C",
        highlight: "#FFCC33",
        stroke: "rgba(18, 24, 31, 0.14)",
        barTrack: "rgba(18, 24, 31, 0.08)",
        danger: "#E84C4C",
      },
      fonts: {
        pair: "space-grotesk",
        ...FONT_PAIR_VARS["space-grotesk"],
      },
      radii: { sm: 12, md: 20, lg: 36, phone: 48 },
      strokeWidth: 2,
      iconStroke: 2.25,
      mood: "bold-blocks",
      density: "compact",
    },
  },
  "tech-blue": {
    name: "Tech Blue",
    tokens: {
      colors: {
        bg: "#0B1526",
        bgElevated: "#13233A",
        surface: "#1C3354",
        ink: "#F0F6FF",
        inkMuted: "#8FA3C1",
        accent: "#3BA3FF",
        accentSoft: "rgba(59, 163, 255, 0.18)",
        accentAlt: "#7C6BFF",
        highlight: "#5EEAD4",
        stroke: "rgba(240, 246, 255, 0.16)",
        barTrack: "rgba(240, 246, 255, 0.08)",
        danger: "#FF6B8A",
      },
      fonts: {
        pair: "space-grotesk",
        ...FONT_PAIR_VARS["space-grotesk"],
      },
      radii: { sm: 8, md: 16, lg: 28, phone: 48 },
      strokeWidth: 1.5,
      iconStroke: 2,
      mood: "dark-wire",
      density: "air",
    },
  },
};

export function resolveFontPair(pair: FontPair): BrandTokens["fonts"] {
  return { pair, ...FONT_PAIR_VARS[pair] };
}

export function deepMergeBrandTokens(partial: unknown): BrandTokens {
  if (!partial || typeof partial !== "object") return defaultBrandTokens;
  const p = partial as Partial<BrandTokens> & { colors?: Partial<BrandColors> };

  const pair = (p.fonts?.pair ?? defaultBrandTokens.fonts.pair) as FontPair;
  const safePair: FontPair = FONT_PAIRS.includes(pair) ? pair : "syne-instrument";
  const mood = (p.mood ?? defaultBrandTokens.mood) as Mood;
  const density = (p.density ?? defaultBrandTokens.density) as Density;

  return {
    colors: { ...defaultBrandTokens.colors, ...p.colors },
    fonts: resolveFontPair(safePair),
    radii: { ...defaultBrandTokens.radii, ...p.radii },
    strokeWidth: typeof p.strokeWidth === "number" ? p.strokeWidth : defaultBrandTokens.strokeWidth,
    iconStroke: typeof p.iconStroke === "number" ? p.iconStroke : defaultBrandTokens.iconStroke,
    mood: MOODS.includes(mood) ? mood : "dark-wire",
    density: DENSITIES.includes(density) ? density : "air",
  };
}

export function tokensToCssVars(tokens: BrandTokens = defaultBrandTokens): Record<string, string> {
  const pad = tokens.density === "compact" ? "56px" : "72px";
  return {
    "--slide-bg": tokens.colors.bg,
    "--slide-bg-elevated": tokens.colors.bgElevated,
    "--slide-surface": tokens.colors.surface,
    "--slide-ink": tokens.colors.ink,
    "--slide-ink-muted": tokens.colors.inkMuted,
    "--slide-accent": tokens.colors.accent,
    "--slide-accent-soft": tokens.colors.accentSoft,
    "--slide-accent-alt": tokens.colors.accentAlt,
    "--slide-highlight": tokens.colors.highlight,
    "--slide-stroke": tokens.colors.stroke,
    "--slide-bar-track": tokens.colors.barTrack,
    "--slide-danger": tokens.colors.danger,
    "--slide-radius-sm": `${tokens.radii.sm}px`,
    "--slide-radius-md": `${tokens.radii.md}px`,
    "--slide-radius-lg": `${tokens.radii.lg}px`,
    "--slide-radius-phone": `${tokens.radii.phone}px`,
    "--slide-stroke-width": `${tokens.strokeWidth}px`,
    "--slide-icon-stroke": `${tokens.iconStroke}`,
    "--slide-font-display": tokens.fonts.display,
    "--slide-font-body": tokens.fonts.body,
    "--slide-font-mono": tokens.fonts.mono,
    "--slide-pad": pad,
    "--slide-mood": tokens.mood,
  };
}
