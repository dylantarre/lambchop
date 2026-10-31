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
import { legendFormatter, seriesColor, tooltipLabelStyle, tooltipStyle } from "../lib/chart-style";

export interface ScatterChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  zKey?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  className?: string;
  xTickFormatter?: (value: number) => string;
  yTickFormatter?: (value: number) => string;
  /** Key holding each point's display name (shown as tooltip title). */
  nameKey?: string;
  color?: string;
  /** Axis scales. "auto" switches to log when positive values span more than 100x. */
  xScale?: "linear" | "log" | "auto";
  yScale?: "linear" | "log" | "auto";
}

function resolveScale(values: number[], mode: "linear" | "log" | "auto"): "linear" | "log" {
  if (mode !== "auto") return mode;
  const finite = values.filter((v) => Number.isFinite(v));
  if (finite.length < 3 || finite.some((v) => v <= 0)) return "linear";
  return Math.max(...finite) / Math.min(...finite) > 100 ? "log" : "linear";
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
  xTickFormatter,
  yTickFormatter,
  nameKey = "name",
  color,
  xScale = "linear",
  yScale = "linear",
}: ScatterChartProps) {
  const colors = useChartColors();
  const xs = resolveScale(data.map((d) => Number(d[xKey])), xScale);
  const ys = resolveScale(data.map((d) => Number(d[yKey])), yScale);

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Scatter chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            type="number"
            dataKey={xKey}
            name={xLabel ?? xKey}
            {...(xs === "log" ? { scale: "log" as const, domain: ["auto", "auto"] as [string, string] } : {})}
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={{ stroke: colors.grid }}
            tickLine={false}
            tickFormatter={xTickFormatter}
          />
          <YAxis
            type="number"
            dataKey={yKey}
            name={yLabel ?? yKey}
            {...(ys === "log" ? { scale: "log" as const, domain: ["auto", "auto"] as [string, string] } : {})}
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
            width={56}
          />
          {zKey && <ZAxis type="number" dataKey={zKey} range={[40, 400]} />}
          <Tooltip
            cursor={{ stroke: colors.cursor, strokeDasharray: "3 3" }}
            contentStyle={tooltipStyle(colors)}
            labelStyle={tooltipLabelStyle}
            labelFormatter={(_l: unknown, payload: ReadonlyArray<{ payload?: Record<string, unknown> }>) => String(payload?.[0]?.payload?.[nameKey] ?? "")}
            formatter={(value: unknown, name: unknown) => [
              name === (xLabel ?? xKey) && xTickFormatter
                ? xTickFormatter(Number(value))
                : name === (yLabel ?? yKey) && yTickFormatter
                  ? yTickFormatter(Number(value))
                  : Number(value).toLocaleString(),
              String(name),
            ]}
          />
          <Scatter data={data} fill={color ?? colors.categorical[1]} fillOpacity={0.8} stroke={colors.tooltipBg} strokeWidth={1} />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
