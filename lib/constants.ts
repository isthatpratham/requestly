export const APP_NAME = "Requestly";
export const APP_TAGLINE = "Developer-focused API discovery and playground platform";
export const APP_DESCRIPTION =
  "Discover public APIs, test endpoints, inspect live responses, and organize requests locally.";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Playground", href: "/playground" },
  { name: "Collections", href: "/collections" },
  { name: "History", href: "/history" },
] as const;

export type NavHref = (typeof NAV_LINKS)[number]["href"];

export const DESIGN_TOKENS = {
  colors: {
    bgPrimary: "#FAFAFA",
    bgSecondary: "#F5F5F5",
    surfaceElevated: "#FFFFFF",
    textPrimary: "#171717",
    textSecondary: "#525252",
    textMuted: "#737373",
    borderDefault: "#E5E5E5",
    borderSubtle: "#F0F0F0",
    borderStrong: "#D4D4D4",
    primaryBlack: "#000000",
  },
  radii: {
    none: "0px",
    xs: "2px",
    sm: "4px",
    md: "6px",
  },
} as const;
