import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#FAFAFA",
          secondary: "#F5F5F5",
          elevated: "#FFFFFF",
        },
        text: {
          primary: "#171717",
          secondary: "#525252",
          muted: "#737373",
          disabled: "#A3A3A3",
        },
        border: {
          DEFAULT: "#E5E5E5",
          subtle: "#F0F0F0",
          strong: "#D4D4D4",
        },
        brand: {
          black: "#000000",
          white: "#FFFFFF",
        },
        semantic: {
          success: {
            fg: "#15803D",
            bg: "#F0FDF4",
          },
          error: {
            fg: "#B91C1C",
            bg: "#FEF2F2",
          },
          warning: {
            fg: "#A16207",
            bg: "#FEFCE8",
          },
          info: {
            fg: "#2563EB",
            bg: "#EFF6FF",
          },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      borderRadius: {
        none: "0px",
        xs: "2px",
        sm: "4px",
        md: "6px",
      },
      boxShadow: {
        none: "none",
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
      },
      maxWidth: {
        container: "1280px",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
