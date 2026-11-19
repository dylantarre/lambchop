import * as React from "react";
import { cn } from "../lib/cn";

export interface LoadingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show the bar. It reserves its 2px either way so toggling never shifts layout. */
  active: boolean;
  /** Announced to screen readers when the bar appears, e.g. "Loading October 2026". */
  label?: string;
}

/**
 * Thin indeterminate progress line for "the data you asked for is on its way".
 * Under reduced motion it shows as a static partial bar instead of sweeping.
 */
export function LoadingBar({ active, label = "Loading", className, ...props }: LoadingBarProps) {
  return (
    <div className={cn("relative h-0.5 w-full overflow-hidden", className)} {...props}>
      {active && (
        <div role="progressbar" aria-label={label} aria-busy="true" className="absolute inset-0 bg-surface-border">
          <div className="absolute inset-y-0 left-0 w-2/5 bg-accent motion-safe:animate-progress" />
        </div>
      )}
      <span className="sr-only" aria-live="polite">{active ? label : ""}</span>
    </div>
  );
}
