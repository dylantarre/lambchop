import * as React from "react";
import { cn } from "../lib/cn";

export interface MetricTrendProps {
  value: string | number;
  delta: number;
  deltaLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: {
    value: "text-base font-semibold",
    delta: "text-xs",
    label: "text-xs",
  },
  md: {
    value: "text-xl font-semibold",
    delta: "text-sm",
    label: "text-sm",
  },
  lg: {
    value: "text-3xl font-semibold",
    delta: "text-base",
    label: "text-base",
  },
} as const;

export function MetricTrend({
  value,
  delta,
  deltaLabel,
  size = "md",
  className,
}: MetricTrendProps) {
  const styles = sizeStyles[size];
  const isPositive = delta >= 0;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn(styles.value, "text-text")}>{value}</span>

      <span
        className={cn(
          styles.delta,
          "font-medium",
          isPositive ? "text-revenue" : "text-loss",
        )}
      >
        {isPositive ? "\u2191" : "\u2193"} {Math.abs(delta).toFixed(1)}%
      </span>

      {deltaLabel && (
        <span className={cn(styles.label, "text-text-muted")}>
          {deltaLabel}
        </span>
      )}
    </div>
  );
}
