import type { Config } from "tailwindcss";

const lambchopPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Surface / background
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
          border: "var(--surface-border)",
          hover: "var(--surface-hover)",
          inverse: "var(--surface-inverse)",
        },
        // Text
        text: {
          DEFAULT: "var(--text)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          inverse: "var(--text-inverse)",
          muted: "var(--text-muted)",
        },
        // Accent (gold)
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
        },
        // Semantic: revenue
        revenue: {
          DEFAULT: "var(--revenue)",
          bg: "var(--revenue-bg)",
        },
        // Semantic: loss
        loss: {
          DEFAULT: "var(--loss)",
          bg: "var(--loss-bg)",
        },
        // Semantic: warning
        warning: {
          DEFAULT: "var(--warning)",
          bg: "var(--warning-bg)",
        },
        // shadcn-style aliases (raw hex vars for opacity modifier support)
        foreground: "var(--foreground)",
        background: "var(--background)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        display: ["Bebas Neue", "Impact", "sans-serif"],
        sans: [
          "DM Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        accent: ["Permanent Marker", "cursive"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        // Data-dense typography scale
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.8125rem", { lineHeight: "1.125rem" }],
        base: ["0.875rem", { lineHeight: "1.25rem" }],
        lg: ["1rem", { lineHeight: "1.375rem" }],
        xl: ["1.125rem", { lineHeight: "1.5rem" }],
        "2xl": ["1.25rem", { lineHeight: "1.625rem" }],
        "3xl": ["1.5rem", { lineHeight: "1.875rem" }],
        "4xl": ["2rem", { lineHeight: "2.25rem" }],
        "5xl": ["2.5rem", { lineHeight: "2.75rem" }],
        "6xl": ["3.5rem", { lineHeight: "3.75rem" }],
      },
      spacing: {
        // Dashboard-specific spacing
        "sidebar-w": "16rem",
        "sidebar-collapsed": "4rem",
        "page-x": "1.5rem",
        "page-y": "1.25rem",
        "card-p": "1.25rem",
      },
      borderRadius: {
        card: "0.125rem",
        button: "0.125rem",
      },
      boxShadow: {
        card: "none",
        "card-hover": "none",
      },
      fontVariantNumeric: {
        tabular: "tabular-nums",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "fade-in-down": "fade-in-down 0.5s ease-out both",
        "fade-in-left": "fade-in-left 0.5s ease-out both",
        "fade-in-right": "fade-in-right 0.5s ease-out both",
        "scale-in": "scale-in 0.5s ease-out both",
      },
    },
  },
};

export default lambchopPreset;
