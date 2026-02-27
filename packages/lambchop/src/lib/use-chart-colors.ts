"use client";

import * as React from "react";

export interface ChartColors {
  grid: string;
  tick: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  cursor: string;
  activeDot: string;
  barCursor: string;
  accent: string;
  series: string[];
}

const DARK_FALLBACK: ChartColors = {
  grid: "#262626",
  tick: "#787878",
  tooltipBg: "#141414",
  tooltipBorder: "#262626",
  tooltipText: "#e6ddd0",
  cursor: "#3a3a3a",
  activeDot: "#e6ddd0",
  barCursor: "rgba(255, 255, 255, 0.04)",
  accent: "#fcd34d",
  series: [
    "#fcd34d",
    "#d4574b",
    "#5b9a8b",
    "#9b7bd4",
    "#e5903b",
    "#4db8a4",
    "#d47b9b",
    "#7bc4d4",
    "#e6ddd0",
  ],
};

function readVar(el: Element, name: string): string {
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  // Tailwind CSS variables store RGB triplets like "252 211 77"
  // which are not valid CSS colors — wrap them in rgb()
  if (/^\d+\s+\d+\s+\d+$/.test(raw)) return `rgb(${raw.replace(/\s+/g, ", ")})`;
  return raw;
}

export function useChartColors(): ChartColors {
  const ref = React.useRef<ChartColors>(DARK_FALLBACK);
  const [, rerender] = React.useState(0);
  const observerRef = React.useRef<MutationObserver | null>(null);

  React.useEffect(() => {
    function read() {
      const el = document.documentElement;
      const grid = readVar(el, "--chart-grid");
      if (!grid) return; // CSS not loaded yet

      ref.current = {
        grid,
        tick: readVar(el, "--chart-tick"),
        tooltipBg: readVar(el, "--chart-tooltip-bg"),
        tooltipBorder: readVar(el, "--chart-tooltip-border"),
        tooltipText: readVar(el, "--chart-tooltip-text"),
        cursor: readVar(el, "--chart-cursor"),
        activeDot: readVar(el, "--chart-active-dot"),
        barCursor: readVar(el, "--chart-bar-cursor"),
        accent: readVar(el, "--accent"),
        series: Array.from({ length: 9 }, (_, i) =>
          readVar(el, `--chart-${i + 1}`),
        ),
      };
      rerender((n) => n + 1);
    }

    read();

    // Re-read when .dark class toggles on <html>
    observerRef.current = new MutationObserver(read);
    observerRef.current.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return ref.current;
}
