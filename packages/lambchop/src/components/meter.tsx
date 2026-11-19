import * as React from "react";
import { cn } from "../lib/cn";

export interface MeterProps {
  /** Fraction 0-1 of the full length. */
  value: number;
  /** "neutral" (3:1 gray), "highlight" (accent-strong, e.g. the viewer's own row), or "accent". */
  tone?: "neutral" | "highlight" | "accent";
  /** Show the full-length track behind the fill (for progress toward a total). */
  track?: boolean;
  /** Override the fill color class. */
  fillClassName?: string;
  className?: string;
}

const TONES = {
  neutral: "bg-chart-neutral",
  highlight: "bg-accent-strong",
  accent: "bg-accent",
} as const;

/**
 * A horizontal bar whose length encodes a value. The fill is scaled with a
 * transform rather than a width, so a changing value animates on the
 * compositor (slow, ease-move) without reflowing the row. Decorative to
 * assistive tech: pair it with the value in text.
 */
export function Meter({ value, tone = "neutral", track = false, fillClassName, className }: MeterProps) {
  const v = Number.isFinite(value) ? Math.min(Math.max(value, 0), 1) : 0;
  return (
    <div aria-hidden="true" className={cn("relative h-2 w-full overflow-hidden rounded-button", track && "bg-surface-border", className)}>
      <div
        className={cn(
          "absolute inset-0 origin-left rounded-button transition-transform duration-slow ease-move motion-reduce:transition-none",
          fillClassName ?? TONES[tone],
        )}
        style={{ transform: `scaleX(${v})` }}
      />
    </div>
  );
}
