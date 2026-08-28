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
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={false}
            tickLine={false}
          />
          {dualAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: colors.tick }}
              axisLine={false}
              tickLine={false}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: "2px",
              boxShadow: "none",
              fontSize: 12,
              color: colors.tooltipText,
            }}
            cursor={{ fill: colors.barCursor }}
            formatter={tooltipFormatter ? (value: unknown) => tooltipFormatter(Number(value)) : undefined}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
          {bars.map((bar, index) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label}
              yAxisId="left"
              fill={bar.color ?? colors.series[index % colors.series.length]}
              radius={[2, 2, 0, 0]}
              maxBarSize={48}
            />
          ))}
          {lines.map((line, index) => {
            const color = line.color ?? colors.series[(bars.length + index) % colors.series.length];
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
