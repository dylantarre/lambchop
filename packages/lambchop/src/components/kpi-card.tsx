import * as React from "react";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import { Sparkline } from "./sparkline";

export interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
  sparklineData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

export function KpiCard({
  label,
  value,
  trend,
  sparklineData,
  icon,
  className,
}: KpiCardProps) {
  const colors = useChartColors();

  return (
    <div
      className={cn(
        "rounded-card border border-surface-border bg-surface p-card-p shadow-card",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex-shrink-0 text-text-tertiary">{icon}</span>
        )}
        <span className="text-sm text-text-secondary">{label}</span>
      </div>

      <div className="mt-2 flex items-end justify-between gap-4">
        <div className="text-3xl font-semibold text-text">{value}</div>
        {sparklineData && sparklineData.length > 0 && (
          <Sparkline
            data={sparklineData}
            width={80}
            height={28}
            color={
              trend
                ? trend.isPositive
                  ? colors.series[2]
                  : colors.series[1]
                : undefined
            }
          />
        )}
      </div>

      {trend && (
        <div className="mt-1 flex items-center gap-1">
          <span
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-revenue" : "text-loss",
            )}
            aria-label={`${trend.isPositive ? "Up" : "Down"} ${Math.abs(trend.value).toFixed(1)}%`}
          >
            {trend.isPositive ? "\u2191" : "\u2193"}{" "}
            {Math.abs(trend.value).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
