"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";

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
  layout?: "vertical" | "horizontal";
  className?: string;
}

export function BarChart({
  data,
  xKey,
  bars,
  height = 300,
  layout = "vertical",
  className,
}: BarChartProps) {
  const colors = useChartColors();

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Bar chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout === "horizontal" ? "vertical" : "horizontal"}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
          {layout === "vertical" ? (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 12, fill: colors.tick }}
                axisLine={{ stroke: colors.grid }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: colors.tick }}
                axisLine={false}
                tickLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: colors.tick }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fontSize: 12, fill: colors.tick }}
                axisLine={{ stroke: colors.grid }}
                tickLine={false}
                width={100}
              />
            </>
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
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="circle"
            iconSize={8}
          />
          {bars.map((bar, index) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label}
              fill={bar.color ?? colors.series[index % colors.series.length]}
              radius={[2, 2, 0, 0]}
              maxBarSize={48}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
