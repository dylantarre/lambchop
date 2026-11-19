import * as React from "react";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import { isFlat } from "../lib/format";
import { Sparkline } from "./sparkline";
import { Pending } from "./pending";
import { Skeleton } from "./skeleton";
import { ValueTransition } from "./value-transition";

export interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
  /** Context for the trend, e.g. "vs last month". */
  trendLabel?: string;
  sparklineData?: number[];
  icon?: React.ReactNode;
  className?: string;
  /** Extra classes for the value, e.g. "text-accent" for the headline number. */
  valueClassName?: string;
  /** The value is loading: the label stays, the value's space is held by a placeholder. */
  pending?: boolean;
  /** The number behind `value`. When given, a change rolls in the direction it moved. */
  numericValue?: number;
  /** Stagger the value's reveal after loading (ms). */
  revealDelay?: number;
}

export function KpiCard({
  label,
  value,
  trend,
  trendLabel,
  sparklineData,
  icon,
  className,
  valueClassName,
  pending = false,
  numericValue,
  revealDelay,
}: KpiCardProps) {
  // A value that arrives after a loading state replaces one nobody could see,
  // so only the new value animates in.
  const wasPending = React.useRef(pending);
  const previousVisible = !wasPending.current;
  React.useEffect(() => {
    wasPending.current = pending;
  }, [pending]);
  const colors = useChartColors();
  const flat = trend ? isFlat(trend.value) : false;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-card border border-surface-border bg-surface p-card-p shadow-card",
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
        <Pending pending={pending} revealDelay={revealDelay} placeholder={<Skeleton className="h-4/5 w-3/4 min-w-16" />} className="min-w-0">
          <div className={cn("text-3xl font-semibold tabular-nums text-text", valueClassName)}>
            <ValueTransition value={value} numeric={numericValue} previousVisible={previousVisible} />
          </div>
        </Pending>
        {sparklineData && sparklineData.length > 1 && (
          <Sparkline
            data={sparklineData}
            width={80}
            height={28}
            color={
              trend && !flat
                ? trend.isPositive
                  ? colors.series[2]
                  : colors.series[1]
                : undefined
            }
          />
        )}
      </div>

      {trend && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className={cn(
              "text-sm font-medium tabular-nums",
              flat ? "text-text-tertiary" : trend.isPositive ? "text-revenue" : "text-loss",
            )}
            aria-label={
              flat
                ? "No change"
                : `${trend.isPositive ? "Up" : "Down"} ${Math.abs(trend.value).toFixed(1)}%`
            }
          >
            {flat ? "–" : trend.isPositive ? "↑" : "↓"}{" "}
            {Math.abs(trend.value).toFixed(1)}%
          </span>
          {trendLabel && (
            <span className="text-xs text-text-tertiary">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
