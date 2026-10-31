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
import { legendFormatter, seriesColor, tooltipStyle } from "../lib/chart-style";

export interface PieChartProps {
  data: Record<string, unknown>[];
  nameKey?: string;
  valueKey?: string;
  donut?: boolean;
  height?: number;
  className?: string;
  tooltipFormatter?: (value: number) => string;
  /** Slice palette. Default "brand"; use "categorical" for many slices. */
  palette?: string[] | "categorical" | "brand";
  /** Show the built-in legend. Default true. */
  showLegend?: boolean;
  /** Text in the donut hole, e.g. the formatted total. */
  centerValue?: string;
  centerLabel?: string;
  /** Index of a slice to emphasize (others dim). */
  activeIndex?: number | null;
  onActiveIndexChange?: (index: number | null) => void;
}

export function PieChart({
  data,
  nameKey = "label",
  valueKey = "value",
  donut = true,
  height = 300,
  className,
  tooltipFormatter,
  palette = "brand",
  showLegend = true,
  centerValue,
  centerLabel,
  activeIndex = null,
  onActiveIndexChange,
}: PieChartProps) {
  const colors = useChartColors();

  return (
    <div className={cn("relative w-full", className)} role="img" aria-label="Pie chart">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            innerRadius={donut ? "62%" : 0}
            outerRadius="88%"
            paddingAngle={0}
            stroke={colors.tooltipBg}
            strokeWidth={2}
            startAngle={90}
            endAngle={-270}
            onMouseEnter={(_, i) => onActiveIndexChange?.(i)}
            onMouseLeave={() => onActiveIndexChange?.(null)}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={seriesColor(colors, index, palette)}
                fillOpacity={activeIndex == null || activeIndex === index ? 1 : 0.35}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle(colors)}
            formatter={tooltipFormatter ? (value: unknown) => tooltipFormatter(Number(value)) : undefined}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              iconType="circle"
              iconSize={8}
              formatter={legendFormatter(colors)}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
      {donut && (centerValue || centerLabel) && (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          style={showLegend ? { paddingBottom: 28 } : undefined}
        >
          {centerValue && (
            <span className="text-2xl font-semibold tabular-nums text-text">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="mt-0.5 text-xs uppercase tracking-wider text-text-tertiary">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
