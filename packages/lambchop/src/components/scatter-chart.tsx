"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";

export interface ScatterChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  zKey?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  className?: string;
}

export function ScatterChart({
  data,
  xKey,
  yKey,
  zKey,
  xLabel,
  yLabel,
  height = 300,
  className,
}: ScatterChartProps) {
  const colors = useChartColors();

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Scatter chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            type="number"
            dataKey={xKey}
            name={xLabel ?? xKey}
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={{ stroke: colors.grid }}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey={yKey}
            name={yLabel ?? yKey}
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={false}
            tickLine={false}
          />
          {zKey && <ZAxis type="number" dataKey={zKey} range={[40, 400]} />}
          <Tooltip
            cursor={{ stroke: colors.cursor, strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: "2px",
              boxShadow: "none",
              fontSize: 12,
              color: colors.tooltipText,
            }}
          />
          <Scatter data={data} fill={colors.series[0]} />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
