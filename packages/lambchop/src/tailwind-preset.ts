import type { Config } from "tailwindcss";
import { motion } from "./lib/motion";

const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const BREAKPOINTS = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const lambchopPreset: Partial<Config> = {
  theme: {
    screens: BREAKPOINTS,
    extend: {
      screens: {
        mobile: "480px",
        tablet: "768px",
        nav: "960px",
        desktop: "1024px",
        wide: "1280px",
      },
      colors: {
        // Surface / background
        surface: {
          DEFAULT: withOpacity("--surface"),
          secondary: withOpacity("--surface-secondary"),
          tertiary: withOpacity("--surface-tertiary"),
          border: withOpacity("--surface-border"),
          hover: withOpacity("--surface-hover"),
          inverse: withOpacity("--surface-inverse"),
        },
        // Text
        text: {
          DEFAULT: withOpacity("--text"),
          secondary: withOpacity("--text-secondary"),
          tertiary: withOpacity("--text-tertiary"),
          inverse: withOpacity("--text-inverse"),
          muted: withOpacity("--text-muted"),
        },
        // Accent (gold)
        accent: {
          DEFAULT: withOpacity("--accent"),
          light: withOpacity("--accent-light"),
          dark: withOpacity("--accent-dark"),
        },
        // Semantic: revenue
        revenue: {
          DEFAULT: withOpacity("--revenue"),
          bg: withOpacity("--revenue-bg"),
        },
        // Semantic: loss
        loss: {
          DEFAULT: withOpacity("--loss"),
          bg: withOpacity("--loss-bg"),
        },
        // Semantic: warning
        warning: {
          DEFAULT: withOpacity("--warning"),
          bg: withOpacity("--warning-bg"),
        },
        // shadcn-style aliases (raw hex vars for opacity modifier support)
        foreground: withOpacity("--foreground"),
        background: withOpacity("--background"),
        primary: {
          DEFAULT: withOpacity("--primary"),
          foreground: withOpacity("--primary-foreground"),
        },
        muted: {
          DEFAULT: withOpacity("--muted"),
          foreground: withOpacity("--muted-foreground"),
        },
        card: {
          DEFAULT: withOpacity("--card"),
          foreground: withOpacity("--card-foreground"),
        },
        border: withOpacity("--border"),
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
        "bottom-nav-h": "4.75rem",
        "bottom-nav-item": "4.5rem",
        "page-x": "1.5rem",
        "page-x-mobile": "1rem",
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
      // Motion tokens (see lib/motion.ts): duration-fast|base|slow, ease-enter|exit|move.
      transitionDuration: {
        fast: `${motion.duration.fast}ms`,
        base: `${motion.duration.base}ms`,
        slow: `${motion.duration.slow}ms`,
      },
      transitionTimingFunction: {
        enter: motion.easing.enter,
        exit: motion.easing.exit,
        move: motion.easing.move,
      },
      keyframes: {
        "lmbchp-reveal": { from: { opacity: "0" }, to: { opacity: "1" } },
        "lmbchp-enter": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "lmbchp-skeleton": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.55" } },
        // Value roll: --lmbchp-value-shift is +0.4em (rising), -0.4em (falling) or 0.
        "lmbchp-value-in": {
          from: { opacity: "0", transform: "translateY(var(--lmbchp-value-shift, 0))" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "lmbchp-value-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(calc(var(--lmbchp-value-shift, 0) * -1))" },
        },
        "lmbchp-progress": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(250%)" },
        },
      },
      animation: {
        reveal: `lmbchp-reveal ${motion.duration.base}ms ${motion.easing.enter} both`,
        enter: `lmbchp-enter ${motion.duration.base}ms ${motion.easing.enter} both`,
        "value-in": `lmbchp-value-in ${motion.duration.base}ms ${motion.easing.enter} both`,
        "value-out": `lmbchp-value-out ${motion.duration.fast}ms ${motion.easing.exit} both`,
        skeleton: "lmbchp-skeleton 1.6s ease-in-out infinite",
        progress: `lmbchp-progress 1.1s ${motion.easing.move} infinite`,
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
