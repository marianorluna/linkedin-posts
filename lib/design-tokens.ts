export const SLIDE_SIZE = 1080 as const;

export const FONT_PAIRS = [
  "syne-instrument",
  "space-grotesk",
  "dm-sans",
  "outfit",
  "bricolage-plex",
  "plex",
] as const;
export type FontPair = (typeof FONT_PAIRS)[number];

export const FONT_PAIR_LABELS: Record<FontPair, string> = {
  "syne-instrument": "Syne + Instrument",
  "space-grotesk": "Space Grotesk",
  "dm-sans": "DM Sans",
  outfit: "Outfit",
  "bricolage-plex": "Bricolage + Plex",
  plex: "IBM Plex Sans",
};

export const MOODS = [
  "dark-wire",
  "light-flat",
  "bold-blocks",
  "soft-wash",
  "paper-grain",
  "neon-edge",
  "split-tone",
] as const;
export type Mood = (typeof MOODS)[number];

export const MOOD_LABELS: Record<Mood, string> = {
  "dark-wire": "Dark wire (gradiente + grid)",
  "light-flat": "Light flat (grid claro)",
  "bold-blocks": "Bold blocks (círculos)",
  "soft-wash": "Soft wash (lavado suave)",
  "paper-grain": "Paper grain (textura)",
  "neon-edge": "Neon edge (borde acento)",
  "split-tone": "Split tone (mitad tono)",
};

export const DENSITIES = ["air", "compact", "tight"] as const;
export type Density = (typeof DENSITIES)[number];

export const DENSITY_LABELS: Record<Density, string> = {
  air: "Air (aireado)",
  compact: "Compact",
  tight: "Tight (denso)",
};

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
  outfit: {
    display: "var(--font-outfit)",
    body: "var(--font-outfit)",
    mono: "var(--font-mono)",
  },
  "bricolage-plex": {
    display: "var(--font-bricolage)",
    body: "var(--font-plex)",
    mono: "var(--font-mono)",
  },
  plex: {
    display: "var(--font-plex)",
    body: "var(--font-plex)",
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

function soft(hex: string, alpha: number): string {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return `color-mix(in srgb, ${hex} ${Math.round(alpha * 100)}%, transparent)`;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function strokeInk(ink: string, alpha: number): string {
  return soft(ink, alpha);
}

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
        accentSoft: soft("#2AB374", 0.18),
        accentAlt: "#E84C4C",
        highlight: "#F0B429",
        stroke: strokeInk("#12181F", 0.12),
        barTrack: strokeInk("#12181F", 0.08),
        danger: "#E84C4C",
      },
      fonts: { pair: "space-grotesk", ...FONT_PAIR_VARS["space-grotesk"] },
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
        accentSoft: soft("#2AB374", 0.18),
        accentAlt: "#E84C4C",
        highlight: "#FFCC33",
        stroke: strokeInk("#12181F", 0.14),
        barTrack: strokeInk("#12181F", 0.08),
        danger: "#E84C4C",
      },
      fonts: { pair: "space-grotesk", ...FONT_PAIR_VARS["space-grotesk"] },
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
        accentSoft: soft("#3BA3FF", 0.18),
        accentAlt: "#7C6BFF",
        highlight: "#5EEAD4",
        stroke: strokeInk("#F0F6FF", 0.16),
        barTrack: strokeInk("#F0F6FF", 0.08),
        danger: "#FF6B8A",
      },
      fonts: { pair: "space-grotesk", ...FONT_PAIR_VARS["space-grotesk"] },
      radii: { sm: 8, md: 16, lg: 28, phone: 48 },
      strokeWidth: 1.5,
      iconStroke: 2,
      mood: "dark-wire",
      density: "air",
    },
  },
  "slate-coral": {
    name: "Slate Coral",
    tokens: {
      colors: {
        bg: "#14181F",
        bgElevated: "#1E2530",
        surface: "#2A3342",
        ink: "#F5F2EE",
        inkMuted: "#A8B0BC",
        accent: "#FF6F61",
        accentSoft: soft("#FF6F61", 0.18),
        accentAlt: "#3ECFB2",
        highlight: "#F2C14E",
        stroke: strokeInk("#F5F2EE", 0.14),
        barTrack: strokeInk("#F5F2EE", 0.08),
        danger: "#FF6F61",
      },
      fonts: { pair: "outfit", ...FONT_PAIR_VARS.outfit },
      radii: { sm: 10, md: 18, lg: 28, phone: 48 },
      strokeWidth: 1.75,
      iconStroke: 2,
      mood: "soft-wash",
      density: "air",
    },
  },
  "forest-signal": {
    name: "Forest Signal",
    tokens: {
      colors: {
        bg: "#0E1712",
        bgElevated: "#16241C",
        surface: "#1F3328",
        ink: "#EAF6EE",
        inkMuted: "#8FAE9A",
        accent: "#6FCF97",
        accentSoft: soft("#6FCF97", 0.2),
        accentAlt: "#E8A838",
        highlight: "#C8F560",
        stroke: strokeInk("#EAF6EE", 0.14),
        barTrack: strokeInk("#EAF6EE", 0.08),
        danger: "#E86A5B",
      },
      fonts: { pair: "bricolage-plex", ...FONT_PAIR_VARS["bricolage-plex"] },
      radii: { sm: 8, md: 14, lg: 24, phone: 48 },
      strokeWidth: 1.5,
      iconStroke: 2.1,
      mood: "neon-edge",
      density: "compact",
    },
  },
  "ink-mono": {
    name: "Ink Mono",
    tokens: {
      colors: {
        bg: "#0A0A0A",
        bgElevated: "#161616",
        surface: "#242424",
        ink: "#FAFAFA",
        inkMuted: "#9C9C9C",
        accent: "#F5E74A",
        accentSoft: soft("#F5E74A", 0.16),
        accentAlt: "#FAFAFA",
        highlight: "#F5E74A",
        stroke: strokeInk("#FAFAFA", 0.18),
        barTrack: strokeInk("#FAFAFA", 0.08),
        danger: "#FF5A5A",
      },
      fonts: { pair: "plex", ...FONT_PAIR_VARS.plex },
      radii: { sm: 4, md: 8, lg: 16, phone: 40 },
      strokeWidth: 2,
      iconStroke: 2.25,
      mood: "split-tone",
      density: "tight",
    },
  },
  "sand-teal": {
    name: "Sand Teal",
    tokens: {
      colors: {
        bg: "#EEF1F4",
        bgElevated: "#FFFFFF",
        surface: "#DCE3EA",
        ink: "#1A222C",
        inkMuted: "#5C6B7A",
        accent: "#0D9488",
        accentSoft: soft("#0D9488", 0.16),
        accentAlt: "#E35D6A",
        highlight: "#D97706",
        stroke: strokeInk("#1A222C", 0.12),
        barTrack: strokeInk("#1A222C", 0.08),
        danger: "#E35D6A",
      },
      fonts: { pair: "dm-sans", ...FONT_PAIR_VARS["dm-sans"] },
      radii: { sm: 14, md: 22, lg: 32, phone: 48 },
      strokeWidth: 1.75,
      iconStroke: 2,
      mood: "paper-grain",
      density: "air",
    },
  },
  "midnight-amber": {
    name: "Midnight Amber",
    tokens: {
      colors: {
        bg: "#12101A",
        bgElevated: "#1C1830",
        surface: "#2A2440",
        ink: "#F7F3EA",
        inkMuted: "#A89FBE",
        accent: "#F0A202",
        accentSoft: soft("#F0A202", 0.18),
        accentAlt: "#2EC4B6",
        highlight: "#FFD166",
        stroke: strokeInk("#F7F3EA", 0.14),
        barTrack: strokeInk("#F7F3EA", 0.08),
        danger: "#EF476F",
      },
      fonts: { pair: "syne-instrument", ...FONT_PAIR_VARS["syne-instrument"] },
      radii: { sm: 10, md: 18, lg: 30, phone: 48 },
      strokeWidth: 1.5,
      iconStroke: 2,
      mood: "soft-wash",
      density: "air",
    },
  },
  "studio-graphite": {
    name: "Studio Graphite",
    tokens: {
      colors: {
        bg: "#1B1E24",
        bgElevated: "#262B34",
        surface: "#343B48",
        ink: "#F2F4F7",
        inkMuted: "#9AA3B2",
        accent: "#00C853",
        accentSoft: soft("#00C853", 0.16),
        accentAlt: "#FF7043",
        highlight: "#40C4FF",
        stroke: strokeInk("#F2F4F7", 0.14),
        barTrack: strokeInk("#F2F4F7", 0.08),
        danger: "#FF5252",
      },
      fonts: { pair: "outfit", ...FONT_PAIR_VARS.outfit },
      radii: { sm: 8, md: 16, lg: 26, phone: 48 },
      strokeWidth: 1.75,
      iconStroke: 2.1,
      mood: "dark-wire",
      density: "compact",
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
  const pad = tokens.density === "tight" ? "44px" : tokens.density === "compact" ? "56px" : "72px";
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
