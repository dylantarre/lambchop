"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import {
  legendFormatter,
  seriesColor,
  tooltipLabelStyle,
  tooltipStyle,
} from "../lib/chart-style";

export interface BarDefinition {
  key: string;
  label: string;
  color?: string;
}

export interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars: BarDefinition[];
  height?: number;
  /** "vertical" = columns (default), "horizontal" = bars growing right. */
  layout?: "vertical" | "horizontal";
  className?: string;
  /** Series palette. Default "brand" (the theme's --chart-N ramp). */
  palette?: string[] | "categorical" | "brand";
  /** Format category labels on the axis. */
  categoryFormatter?: (value: string) => string;
  /** Format value-axis ticks. */
  valueTickFormatter?: (value: number) => string;
  /** Format values in tooltips and on-bar labels. */
  valueFormatter?: (value: number) => string;
  /** Alias of valueFormatter for parity with the other charts. */
  tooltipFormatter?: (value: number) => string;
  /** Print each bar's value at its end. */
  showValues?: boolean;
  /** Show the legend. Default true. */
  showLegend?: boolean;
  /** Emphasize one category (others are dimmed). */
  highlightIndex?: number;
  /** Width reserved for category labels in horizontal layout. Default: fitted to labels. */
  categoryWidth?: number;
}

export function BarChart({
  data,
  xKey,
  bars,
  height = 300,
  layout = "vertical",
  className,
  palette = "brand",
  categoryFormatter,
  valueTickFormatter,
  valueFormatter: valueFormatterProp,
  tooltipFormatter,
  showValues = false,
  showLegend = true,
  highlightIndex,
  categoryWidth,
}: BarChartProps) {
  const colors = useChartColors();
  const horizontal = layout === "horizontal";
  const valueFormatter = valueFormatterProp ?? tooltipFormatter;

  const fittedWidth = React.useMemo(() => {
    if (categoryWidth) return categoryWidth;
    const longest = data.reduce((max, row) => {
      const raw = String(row[xKey] ?? "");
      const label = categoryFormatter ? categoryFormatter(raw) : raw;
      return Math.max(max, label.length);
    }, 0);
    return Math.min(190, Math.max(64, Math.round(longest * 7.4) + 16));
  }, [categoryWidth, data, xKey, categoryFormatter]);

  const tick = { fontSize: 12, fill: colors.tick };
  const labelFmt = (v: unknown) =>
    valueFormatter ? valueFormatter(Number(v)) : Number(v).toLocaleString();
  const crowded = !horizontal && data.length > 6;

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Bar chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{
            top: showValues && !horizontal ? 20 : 8,
            right: showValues && horizontal ? 64 : 16,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={horizontal ? "24%" : "20%"}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={horizontal}
            horizontal={!horizontal}
          />
          <XAxis
            {...(horizontal
              ? {
                  type: "number" as const,
                  axisLine: false,
                  tickFormatter: valueTickFormatter,
                }
              : {
                  dataKey: xKey,
                  type: "category" as const,
                  axisLine: { stroke: colors.grid },
                  interval: crowded ? 0 : ("equidistantPreserveStart" as const),
                  tickFormatter: categoryFormatter,
                  angle: crowded ? -35 : 0,
                  textAnchor: crowded ? "end" : "middle",
                  height: crowded ? 70 : 30,
                })}
            tick={tick}
            tickLine={false}
          />
          <YAxis
            {...(horizontal
              ? {
                  dataKey: xKey,
                  type: "category" as const,
                  axisLine: { stroke: colors.grid },
                  width: fittedWidth,
                  interval: 0,
                  tickFormatter: categoryFormatter,
                  tick: { ...tick, fill: colors.tooltipText },
                }
              : {
                  type: "number" as const,
                  axisLine: false,
                  tickFormatter: valueTickFormatter,
                  width: 56,
                  tick,
                })}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle(colors)}
            labelStyle={tooltipLabelStyle}
            labelFormatter={(_label, payload) => {
              const entry = payload?.[0]?.payload;
              return entry?.[xKey] ?? _label;
            }}
            formatter={valueFormatter ? (value: unknown) => valueFormatter(Number(value)) : undefined}
            cursor={{ fill: colors.barCursor }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="circle"
              iconSize={8}
              formatter={legendFormatter(colors)}
            />
          )}
          {bars.map((bar, index) => {
            const fill = seriesColor(colors, index, palette, bar.color);
            return (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.label}
                fill={fill}
                radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                maxBarSize={horizontal ? 26 : 48}
              >
                {highlightIndex != null &&
                  data.map((_, i) => (
                    <Cell
                      key={i}
                      fill={fill}
                      fillOpacity={i === highlightIndex ? 1 : 0.45}
                    />
                  ))}
                {showValues && (
                  <LabelList
                    dataKey={bar.key}
                    position={horizontal ? "right" : "top"}
                    formatter={labelFmt}
                    style={{ fill: colors.tick, fontSize: 11, fontWeight: 500 }}
                  />
                )}
              </Bar>
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
