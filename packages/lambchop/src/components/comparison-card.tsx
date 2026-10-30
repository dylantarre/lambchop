import * as React from "react";
import { cn } from "../lib/cn";
import { isFlat, percentChange } from "../lib/format";

export interface ComparisonCardProps {
  label: string;
  current: number;
  previous: number;
  format?: (v: number) => string;
  /** Names for the two periods. Default "Now" / "Before". */
  currentLabel?: string;
  previousLabel?: string;
  /** Set when a decrease is good (costs, churn). */
  invert?: boolean;
  className?: string;
}

/** Current vs previous with the change called out and a two-bar comparison. */
export function ComparisonCard({
  label,
  current,
  previous,
  format = (v) => v.toLocaleString(),
  currentLabel = "Now",
  previousLabel = "Before",
  invert = false,
  className,
}: ComparisonCardProps) {
  const delta = percentChange(current, previous);
  const flat = isFlat(delta);
  const up = (delta ?? 0) > 0;
  const good = invert ? !up : up;
  const max = Math.max(Math.abs(current), Math.abs(previous), 1e-9);

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-card border border-surface-border bg-surface p-card-p",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-text-secondary">{label}</span>
        {delta != null && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-button px-1.5 py-0.5 text-xs font-semibold tabular-nums",
              flat
                ? "bg-surface-tertiary text-text-tertiary"
                : good
                  ? "bg-revenue-bg text-revenue"
                  : "bg-loss-bg text-loss",
            )}
            aria-label={flat ? "No change" : `${up ? "Up" : "Down"} ${Math.abs(delta).toFixed(1)}%`}
          >
            {flat ? "–" : up ? "↑" : "↓"} {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="text-3xl font-semibold tabular-nums text-text">{format(current)}</div>
      <div className="mt-auto flex flex-col gap-1.5">
        {[
          { name: currentLabel, value: current, strong: true },
          { name: previousLabel, value: previous, strong: false },
        ].map((row) => (
          <div key={row.name} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2 text-xs">
            <span className="truncate text-text-tertiary">{row.name}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-surface-tertiary">
              <span
                className={cn("block h-full rounded-full", row.strong ? "bg-accent" : "bg-text-tertiary/60")}
                style={{ width: `${(Math.abs(row.value) / max) * 100}%` }}
              />
            </span>
            <span className={cn("tabular-nums", row.strong ? "text-text" : "text-text-tertiary")}>
              {format(row.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
