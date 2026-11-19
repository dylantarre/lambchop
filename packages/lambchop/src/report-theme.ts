// A report canvas changes the document palette so portaled controls and chart
// tooltips resolve the same tokens as the dashboard shell.
import plugin from "tailwindcss/plugin";

export const reportTheme = plugin(({ addBase, addComponents, theme }) => {
  addBase({
    ":root[data-report-view]": {
      "--foreground": "var(--text)",
      "--background": "var(--surface)",
      "--primary": "var(--accent)",
      "--primary-foreground": "var(--text-inverse)",
      "--muted": "var(--surface-tertiary)",
      "--muted-foreground": "var(--text-muted)",
      "--card": "var(--surface-secondary)",
      "--card-foreground": "var(--text)",
      "--border": "var(--surface-border)",
    },
    ":root.dark[data-report-view]": {
      "--text-muted": "169 169 169",
      "--text-tertiary": "169 169 169",
      "--chart-tick": "rgb(var(--text-secondary))",
    },
    ":root:not(.dark)[data-report-view]": {
      // Saturated gold for light-mode details. Never text on white (about 1.8:1):
      // only fills behind ink text, solid edges, and ringed chart dots.
      "--gold": "245 179 1",
      "--surface": "247 248 250",
      "--surface-secondary": "255 255 255",
      "--surface-tertiary": "237 239 242",
      "--surface-hover": "237 239 242",
      "--surface-border": "211 215 222",
      "--text": "30 34 40",
      "--text-secondary": "71 78 88",
      "--text-muted": "87 95 106",
      "--text-tertiary": "87 95 106",
      "--text-inverse": "255 255 255",
      "--accent": "var(--text)",
      // Today's AA accent for small text and selected pills follows the report ink too.
      "--accent-strong": "var(--text)",
      "--surface-inverse": "var(--text)",
      "--chart-grid": "rgb(var(--surface-border))",
      "--chart-tick": "rgb(var(--text-secondary))",
      "--chart-tooltip-bg": "rgb(var(--surface-secondary))",
      "--chart-tooltip-border": "rgb(var(--surface-border))",
      "--chart-tooltip-text": "rgb(var(--text))",
    },
  });
  addComponents({
    "[data-report-view] .report-shell": {
      backgroundColor: "rgb(var(--surface))",
      "& > header, & > nav": { backgroundColor: "rgb(var(--surface-secondary))" },
      "& > nav a[aria-current='page']": {
        backgroundColor: "rgb(var(--surface-inverse))",
        color: "rgb(var(--text-inverse))",
        borderRadius: theme("borderRadius.md"),
        "& [aria-hidden]": { color: "inherit" },
      },
    },
    "[data-report-view]": {
      "& [data-slot='page-title']": {
        fontSize: theme("fontSize.4xl"), lineHeight: theme("lineHeight.tight"),
        fontWeight: theme("fontWeight.medium"), overflowWrap: "anywhere",
      },
      "& [data-slot='card']": {
        backgroundColor: "rgb(var(--surface-secondary))",
        borderRadius: theme("borderRadius.lg"), borderWidth: "1px",
        borderColor: "rgb(var(--surface-border))", boxShadow: "none",
      },
      "& [data-slot='card-title']": {
        fontFamily: theme("fontFamily.sans"), fontWeight: theme("fontWeight.semibold"),
        fontSize: theme("fontSize.xl"), textTransform: "none", letterSpacing: "normal",
      },
      "& .report-trend [data-slot='card-title']": { fontSize: theme("fontSize.2xl") },
      "& .report-filter": {
        border: "1px solid rgb(var(--surface-border))", borderRadius: theme("borderRadius.md"),
        backgroundColor: "rgb(var(--surface-secondary))", color: "rgb(var(--text-secondary))",
        "&:hover": { backgroundColor: "rgb(var(--surface-hover))" },
        "&[aria-pressed='true']": {
          backgroundColor: "rgb(var(--accent))", color: "rgb(var(--text-inverse))", borderColor: "transparent",
        },
      },
      "& :where(a,button,input,select,textarea,[tabindex]):focus-visible": { outline: "2px solid rgb(var(--accent))", outlineOffset: "2px" },
      "& [data-slot='kpi']": {
        minWidth: "0", borderWidth: "1px", borderRadius: theme("borderRadius.lg"), backgroundColor: "rgb(var(--surface-secondary))",
        padding: theme("spacing.4"), boxShadow: "none",
      },
      "& [data-slot='kpi-value']:not([data-custom-size])": { fontSize: theme("fontSize.3xl"), lineHeight: theme("lineHeight.tight"), overflowWrap: "anywhere" },
      [`@media (min-width: ${theme("screens.lg")})`]: {
        "& [data-slot='kpi']": { padding: theme("spacing.card-p") },
        "& [data-slot='kpi-value']:not([data-custom-size])": { fontSize: theme("fontSize.4xl") },
      },
      "@media (prefers-reduced-motion: reduce)": {
        "&, & *": { animationDuration: "0.01ms !important", transitionDuration: "0.01ms !important" },
      },
    },
    // Gold details (light mode only). Solid gold, never a tint and never dark gold.
    ":root:not(.dark)[data-report-view]": {
      // Selected filters (Pill, report-filter) and the active nav tab: gold behind ink text.
      "& button[aria-pressed='true']": {
        backgroundColor: "rgb(var(--gold))", color: "rgb(var(--text))", borderColor: "transparent",
      },
      "& .report-shell > nav a[aria-current='page']": {
        backgroundColor: "rgb(var(--gold))", color: "rgb(var(--text))",
      },
      // The payout: a solid gold edge on its KPI and on the payout total.
      "& .report-payout": { boxShadow: "inset 0 3px 0 rgb(var(--gold))" },
      "& .report-metrics .report-payout": { boxShadow: "inset 0 3px 0 rgb(var(--gold)), 0 0 0 1px rgb(var(--surface-border))" },
      "& [data-payout-total]": { boxShadow: "inset 4px 0 0 rgb(var(--gold))" },
      // Earnings chart: a saturated gold line with no fill under it, and gold dots with an
      // ink ring. The line is about 1.8:1 on white, so the values stay available through
      // the labeled best day, the tooltip, keyboard inspection and the screen-reader table.
      "& .report-trend .recharts-area-area": { fillOpacity: "0" },
      "& .report-trend .recharts-area-curve": { stroke: "rgb(var(--gold))" },
      "& .report-trend .recharts-reference-dot circle, & .report-trend .recharts-active-dot circle": {
        fill: "rgb(var(--gold))", stroke: "rgb(var(--text))", strokeWidth: "2px",
      },
      // The viewer's leaderboard row, bar and word-pool slice.
      "& [data-current]": { boxShadow: "inset 3px 0 0 rgb(var(--gold))" },
      "& [data-current] .bg-accent-strong, & [role='img'] > .bg-accent-strong": { backgroundColor: "rgb(var(--gold))" },
    },
    "[data-report-view] .report-metrics": {
      overflow: "hidden", gap: "0", border: "1px solid rgb(var(--surface-border))",
      borderRadius: theme("borderRadius.lg"), backgroundColor: "rgb(var(--surface-secondary))",
      "& [data-slot='kpi']": {
        borderWidth: "0", borderRadius: "0", boxShadow: "0 0 0 1px rgb(var(--surface-border))",
      },
    },
  });
});
