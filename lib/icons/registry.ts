export const ICON_IDS = [
  "lightbulb",
  "gears",
  "chart-up",
  "brain",
  "target",
  "flag",
  "users",
  "process",
  "globe",
  "cloud",
  "chip",
  "robot",
  "network",
  "document",
  "check",
  "growth",
  "coin",
  "search",
] as const;

export type IconId = (typeof ICON_IDS)[number];

export function isIconId(value: string): value is IconId {
  return (ICON_IDS as readonly string[]).includes(value);
}
