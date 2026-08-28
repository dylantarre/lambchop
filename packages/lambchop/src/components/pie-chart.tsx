"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";

export interface PieChartProps {
  data: Record<string, unknown>[];
  nameKey?: string;
  valueKey?: string;
  donut?: boolean;
  height?: number;
  className?: string;
  tooltipFormatter?: (value: number) => string;
}

export function PieChart({
  data,
  nameKey = "label",
  valueKey = "value",
  donut = true,
  height = 300,
  className,
  tooltipFormatter,
}: PieChartProps) {
  const colors = useChartColors();

  return (
    <div className={cn("w-full", className)} role="img" aria-label="Pie chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            innerRadius={donut ? "55%" : 0}
            outerRadius="82%"
            paddingAngle={data.length > 1 ? 2 : 0}
            stroke={colors.tooltipBg}
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={colors.series[index % colors.series.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: colors.tooltipBg,
              border: `1px solid ${colors.tooltipBorder}`,
              borderRadius: "2px",
              boxShadow: "none",
              fontSize: 12,
              color: colors.tooltipText,
            }}
            formatter={tooltipFormatter ? (value: unknown) => tooltipFormatter(Number(value)) : undefined}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" iconSize={8} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
