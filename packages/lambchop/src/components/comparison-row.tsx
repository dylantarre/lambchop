import * as React from "react";
import { cn } from "../lib/cn";

export interface ComparisonRowProps {
  label: string;
  current: number;
  previous: number;
  format?: (v: number) => string;
  className?: string;
}

export function ComparisonRow({
  label,
  current,
  previous,
  format = (v) => v.toLocaleString(),
  className,
}: ComparisonRowProps) {
  const delta =
    previous !== 0 ? ((current - previous) / Math.abs(previous)) * 100 : 0;
  const isPositive = delta >= 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2",
        className,
      )}
    >
      <span className="min-w-0 flex-shrink truncate text-sm text-text-secondary">
        {label}
      </span>

      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-text">
          {format(current)}
        </span>

        <span className="text-sm text-text-muted">{format(previous)}</span>

        <span
          className={cn(
            "inline-flex items-center rounded-button px-2 py-0.5 text-xs font-medium",
            isPositive
              ? "bg-revenue-bg text-revenue"
              : "bg-loss-bg text-loss",
          )}
          aria-label={`${isPositive ? "Up" : "Down"} ${Math.abs(delta).toFixed(1)}%`}
        >
          {isPositive ? "\u2191" : "\u2193"} {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
