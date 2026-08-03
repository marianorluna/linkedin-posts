import type { CSSProperties, ReactNode } from "react";
import type { IconId } from "@/lib/icons/registry";

type Props = {
  id: IconId;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function paths(id: IconId): ReactNode {
  switch (id) {
    case "lightbulb":
      return (
        <>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        </>
      );
    case "gears":
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          <circle cx="18" cy="6" r="2" />
        </>
      );
    case "chart-up":
      return (
        <>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-6" />
          <path d="M17 7h3v3" />
        </>
      );
    case "brain":
      return (
        <>
          <path d="M12 4c-2 0-3.5 1.2-4 3-.8-.4-1.8-.3-2.5.4C4.5 8.3 4 9.4 4 10.7c0 1 .4 1.9 1 2.5-.2.5-.3 1-.3 1.5 0 1.7 1.3 3.1 3 3.3V20h8v-2c1.7-.2 3-1.6 3-3.3 0-.5-.1-1-.3-1.5.6-.6 1-1.5 1-2.5 0-1.3-.5-2.4-1.5-3.1-.7-.7-1.7-.8-2.5-.4-.5-1.8-2-3-4-3z" />
          <path d="M12 8v8M9 11h6" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </>
      );
    case "flag":
      return (
        <>
          <path d="M5 21V4" />
          <path d="M5 4h10l-2 4 2 4H5" />
        </>
      );
    case "users":
      return (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M2.5 19c.8-3 3-5 6.5-5s5.7 2 6.5 5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M16 14.2c2.2.4 3.8 1.8 4.5 4.3" />
        </>
      );
    case "process":
      return (
        <>
          <path d="M4 7h10" />
          <path d="M14 7l-3-3M14 7l-3 3" />
          <path d="M20 17H10" />
          <path d="M10 17l3-3M10 17l3 3" />
          <circle cx="4" cy="7" r="1.5" />
          <circle cx="20" cy="17" r="1.5" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </>
      );
    case "cloud":
      return (
        <>
          <path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.5 2A3.5 3.5 0 0 0 7 18z" />
          <path d="M12 11v5M12 16l-2-2M12 16l2-2" />
        </>
      );
    case "chip":
      return (
        <>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <rect x="10" y="10" width="4" height="4" />
          <path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" />
        </>
      );
    case "robot":
      return (
        <>
          <rect x="6" y="8" width="12" height="10" rx="2" />
          <path d="M12 4v4" />
          <circle cx="12" cy="3.5" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <path d="M9 15h6" />
        </>
      );
    case "network":
      return (
        <>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <circle cx="12" cy="11" r="2" />
          <path d="M7.5 7.5L10.5 10M16.5 7.5L13.5 10M12 13v3" />
        </>
      );
    case "document":
      return (
        <>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M9 12h6M9 16h6" />
        </>
      );
    case "check":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.5 2.5L16 9" />
        </>
      );
    case "growth":
      return (
        <>
          <path d="M4 18h16" />
          <path d="M6 14v4M10 10v8M14 7v11M18 4v14" />
        </>
      );
    case "coin":
      return (
        <>
          <ellipse cx="12" cy="12" rx="8" ry="8" />
          <path d="M12 7v10M9.5 9.5c.7-1 2-1.5 2.5-1.5s2 .6 2 1.7c0 2.3-5 1.2-5 3.6 0 1.2 1.2 2.2 2.5 2.2s1.9-.5 2.5-1.3" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </>
      );
    case "code":
      return (
        <>
          <path d="M8 8l-4 4 4 4" />
          <path d="M16 8l4 4-4 4" />
          <path d="M13 5l-2 14" />
        </>
      );
    case "terminal":
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9l3 3-3 3" />
          <path d="M12 15h5" />
        </>
      );
    case "building":
      return (
        <>
          <path d="M4 21V5l8-2 8 2v16" />
          <path d="M4 21h16" />
          <path d="M9 9h1.5M13.5 9H15M9 13h1.5M13.5 13H15M9 17h1.5M13.5 17H15" />
          <path d="M11 21v-4h2v4" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 12l9 5 9-5" />
          <path d="M3 16l9 5 9-5" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
          <circle cx="12" cy="12" r="3" />
        </>
      );
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function SlideIcon({ id, size = 48, className = "", strokeWidth }: Props) {
  const style = {
    width: size,
    height: size,
    strokeWidth: strokeWidth ?? "var(--slide-icon-stroke)",
  } as CSSProperties;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {paths(id)}
    </svg>
  );
}
