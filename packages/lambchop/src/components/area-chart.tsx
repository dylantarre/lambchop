"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";

export interface AreaDefinition {
  key: string;
  label: string;
  color?: string;
}

export interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  areas: AreaDefinition[];
  height?: number;
  stacked?: boolean;
  className?: string;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
}

export function AreaChart({
  data,
  xKey,
  areas,
  height = 300,
  stacked = true,
  className,
  xTickFormatter,
  yTickFormatter,
  tooltipFormatter,
}: AreaChartProps) {
  const gradientId = React.useId();
  const colors = useChartColors();
  const [hidden, setHidden] = React.useState<Set<string>>(new Set());

  const toggleSeries = React.useCallback((dataKey: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(dataKey)) next.delete(dataKey);
      else next.add(dataKey);
      return next;
    });
  }, []);

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Area chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <defs>
            {areas.map((area, index) => {
              const color =
                area.color ?? colors.series[index % colors.series.length];
              return (
                <linearGradient
                  key={area.key}
                  id={`${gradientId}-${area.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={stacked ? 0.85 : 0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={stacked ? 0.7 : 0.02} />
                </linearGradient>
              );
            })}
          </defs>
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
            tickFormatter={xTickFormatter}
          />
          <YAxis
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
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
            formatter={tooltipFormatter ? (value: unknown) => tooltipFormatter(Number(value)) : undefined}
            itemSorter={stacked ? () => -1 : undefined}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8, cursor: "pointer" }}
            iconType="circle"
            iconSize={8}
            onClick={(e) => e.dataKey && toggleSeries(e.dataKey as string)}
            formatter={(value, entry) => (
              <span style={{ color: hidden.has(entry.dataKey as string) ? colors.tick : undefined, opacity: hidden.has(entry.dataKey as string) ? 0.4 : 1 }}>{value}</span>
            )}
            payload={stacked
              ? [...areas].reverse().map((area, i) => {
                  const origIndex = areas.length - 1 - i;
                  const color = area.color ?? colors.series[origIndex % colors.series.length];
                  return { value: area.label, type: "circle" as const, id: area.key, dataKey: area.key, color, inactive: hidden.has(area.key) };
                })
              : undefined
            }
          />
          {areas.map((area, index) => {
            const color =
              area.color ?? colors.series[index % colors.series.length];
            return (
              <Area
                key={area.key}
                dataKey={area.key}
                name={area.label}
                type="monotone"
                stroke={color}
                strokeWidth={stacked ? 1.5 : 2}
                fill={stacked ? color : `url(#${gradientId}-${area.key})`}
                fillOpacity={stacked ? 0.75 : 1}
                stackId={stacked ? "stack" : undefined}
                dot={false}
                hide={hidden.has(area.key)}
                activeDot={{
                  r: 4,
                  fill: color,
                  stroke: colors.activeDot,
                  strokeWidth: 2,
                }}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
