"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  ComposedChart as RechartsComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import {
  legendFormatter,
  seriesColor,
  tooltipLabelStyle,
  tooltipStyle,
} from "../lib/chart-style";

export interface LineDefinition {
  key: string;
  label: string;
  color?: string;
}

export interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  lines: LineDefinition[];
  height?: number;
  className?: string;
  /** Series palette. Default "brand". */
  palette?: string[] | "categorical" | "brand";
  /** Start at a later palette slot (e.g. 1 to avoid the accent next to a bar chart). */
  paletteOffset?: number;
  xTickFormatter?: (value: string) => string;
  /** Long form of the x value shown as the tooltip title. */
  tooltipLabelFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  /** Show the legend. Default true. */
  showLegend?: boolean;
  /** Fill under a single line with a soft gradient. Default false. */
  fillSingle?: boolean;
  /** Draw a dashed horizontal reference (e.g. the period average). */
  referenceValue?: number;
  referenceLabel?: string;
}

export function LineChart({
  data,
  xKey,
  lines,
  height = 300,
  className,
  palette = "brand",
  paletteOffset = 0,
  xTickFormatter,
  tooltipLabelFormatter,
  yTickFormatter,
  tooltipFormatter,
  showLegend = true,
  fillSingle = false,
  referenceValue,
  referenceLabel,
}: LineChartProps) {
  const colors = useChartColors();
  const gradientId = React.useId().replace(/:/g, "");
  const single = lines.length === 1;
  const tick = { fontSize: 12, fill: colors.tick };

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Line chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsComposedChart
          data={data}
          margin={{ top: 8, right: 24, left: 0, bottom: 0 }}
        >
          {single && fillSingle && (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={seriesColor(colors, paletteOffset, palette, lines[0].color)} stopOpacity={0.28} />
                <stop offset="100%" stopColor={seriesColor(colors, paletteOffset, palette, lines[0].color)} stopOpacity={0} />
              </linearGradient>
            </defs>
          )}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            tick={tick}
            axisLine={{ stroke: colors.grid }}
            tickLine={false}
            tickFormatter={xTickFormatter}
            minTickGap={24}
            interval={data.length <= 12 ? "equidistantPreserveStart" : "preserveStartEnd"}
          />
          <YAxis
            tick={tick}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
            width={56}
          />
          <Tooltip
            contentStyle={tooltipStyle(colors)}
            labelStyle={tooltipLabelStyle}
            labelFormatter={tooltipLabelFormatter ? (l: unknown) => tooltipLabelFormatter(String(l)) : undefined}
            formatter={tooltipFormatter ? (value: unknown) => tooltipFormatter(Number(value)) : undefined}
            cursor={{ stroke: colors.cursor, strokeDasharray: "3 3" }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="circle"
              iconSize={8}
              formatter={legendFormatter(colors)}
            />
          )}
          {referenceValue != null && Number.isFinite(referenceValue) && (
            <ReferenceLine
              y={referenceValue}
              stroke={colors.tick}
              strokeDasharray="4 4"
              strokeOpacity={0.7}
              label={
                referenceLabel
                  ? { value: referenceLabel, position: "insideTopRight", fill: colors.tick, fontSize: 11 }
                  : undefined
              }
            />
          )}
          {single && fillSingle && (
            <Area
              dataKey={lines[0].key}
              type="monotone"
              stroke="none"
              fill={`url(#${gradientId})`}
              legendType="none"
              tooltipType="none"
              isAnimationActive={false}
            />
          )}
          {lines.map((line, index) => {
            const color = seriesColor(colors, index + paletteOffset, palette, line.color);
            return (
              <Line
                key={line.key}
                dataKey={line.key}
                name={line.label}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: color,
                  stroke: colors.activeDot,
                  strokeWidth: 2,
                }}
              />
            );
          })}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
