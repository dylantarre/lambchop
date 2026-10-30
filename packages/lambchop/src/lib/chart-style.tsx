import type * as React from "react";
import type { ChartColors } from "./use-chart-colors";

/** Shared Recharts tooltip container style. */
export function tooltipStyle(colors: ChartColors): React.CSSProperties {
  return {
    backgroundColor: colors.tooltipBg,
    border: `1px solid ${colors.tooltipBorder}`,
    borderRadius: "2px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.28)",
    fontSize: 12,
    color: colors.tooltipText,
    padding: "8px 10px",
  };
}

export const tooltipLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  marginBottom: 4,
};

/** Legend text wears the tick (text) color, never the series color. */
export function legendFormatter(colors: ChartColors) {
  return (value: unknown) => (
    <span style={{ color: colors.tick, fontSize: 12 }}>{String(value)}</span>
  );
}

/** Pick a series color: explicit override → palette → brand series. */
export function seriesColor(
  colors: ChartColors,
  index: number,
  palette?: string[] | "categorical" | "brand",
  override?: string,
): string {
  if (override) return override;
  const list =
    Array.isArray(palette)
      ? palette
      : palette === "categorical"
        ? colors.categorical
        : colors.series;
  return list[index % list.length];
}
