"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";

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
}

export function LineChart({
  data,
  xKey,
  lines,
  height = 300,
  className,
}: LineChartProps) {
  const colors = useChartColors();

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Line chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
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
          <Tooltip
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: "2px",
              boxShadow: "none",
              fontSize: 12,
              color: colors.tooltipText,
            }}
            cursor={{ stroke: colors.cursor, strokeDasharray: "3 3" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            iconType="circle"
            iconSize={8}
          />
          {lines.map((line, index) => {
            const color =
              line.color ?? colors.series[index % colors.series.length];
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
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
