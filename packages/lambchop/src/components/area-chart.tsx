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
}

export function AreaChart({
  data,
  xKey,
  areas,
  height = 300,
  stacked = true,
  className,
}: AreaChartProps) {
  const gradientId = React.useId();
  const colors = useChartColors();

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
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
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
                strokeWidth={2}
                fill={`url(#${gradientId}-${area.key})`}
                stackId={stacked ? "stack" : undefined}
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
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
