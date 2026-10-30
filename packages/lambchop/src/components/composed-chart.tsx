"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  ComposedChart as RechartsComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import { legendFormatter, seriesColor, tooltipLabelStyle, tooltipStyle } from "../lib/chart-style";

export interface ComposedBarDefinition {
  key: string;
  label: string;
  color?: string;
}

export interface ComposedLineDefinition {
  key: string;
  label: string;
  color?: string;
  yAxisId?: "left" | "right";
}

export interface ComposedChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars?: ComposedBarDefinition[];
  lines?: ComposedLineDefinition[];
  dualAxis?: boolean;
  height?: number;
  className?: string;
  tooltipFormatter?: (value: number) => string;
  tooltipLabelFormatter?: (value: string) => string;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  /** Right-axis tick formatter when dualAxis is on. */
  yRightTickFormatter?: (value: number) => string;
  /** Series palette. Default "brand". */
  palette?: string[] | "categorical" | "brand";
}

export function ComposedChart({
  data,
  xKey,
  bars = [],
  lines = [],
  dualAxis = false,
  height = 300,
  className,
  tooltipFormatter,
  tooltipLabelFormatter,
  xTickFormatter,
  yTickFormatter,
  yRightTickFormatter,
  palette = "brand",
}: ComposedChartProps) {
  const colors = useChartColors();

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Composed chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsComposedChart
          data={data}
          margin={{ top: 8, right: dualAxis ? 20 : 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={{ stroke: colors.grid }}
            tickLine={false}
            tickFormatter={xTickFormatter}
            minTickGap={24}
            interval={data.length <= 12 ? "equidistantPreserveStart" : "preserveStartEnd"}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
            width={56}
          />
          {dualAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: colors.tick }}
              axisLine={false}
              tickLine={false}
              tickFormatter={yRightTickFormatter}
              width={56}
            />
          )}
          <Tooltip
            contentStyle={tooltipStyle(colors)}
            labelStyle={tooltipLabelStyle}
            labelFormatter={tooltipLabelFormatter ? (l: unknown) => tooltipLabelFormatter(String(l)) : undefined}
            cursor={{ fill: colors.barCursor }}
            formatter={tooltipFormatter ? (value: unknown) => tooltipFormatter(Number(value)) : undefined}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} formatter={legendFormatter(colors)} />
          {bars.map((bar, index) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label}
              yAxisId="left"
              fill={seriesColor(colors, index, palette, bar.color)}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          ))}
          {lines.map((line, index) => {
            const color = seriesColor(colors, bars.length + index, palette, line.color);
            return (
              <Line
                key={line.key}
                dataKey={line.key}
                name={line.label}
                yAxisId={line.yAxisId ?? (dualAxis ? "right" : "left")}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: color, stroke: colors.activeDot, strokeWidth: 2 }}
              />
            );
          })}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
