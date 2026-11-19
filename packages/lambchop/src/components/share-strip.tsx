import * as React from "react";
import { cn } from "../lib/cn";

export interface ShareSegment {
  key: string;
  value: number;
  /** Draw this segment in the highlight color (e.g. the viewer's own share). */
  highlight?: boolean;
}

export interface ShareStripProps {
  segments: ShareSegment[];
  /** Accessible description, e.g. "Your share: 11.1% of 127,600 words". */
  label: string;
  className?: string;
}

/**
 * Part-to-whole in one line: every contributor is a segment of a single
 * 100% bar, separated by a 2px surface gap, with the highlighted segment in
 * accent-strong. Use it when what matters is a slice of a shared pool, not a
 * rank. Read as one image by assistive tech via `label`.
 */
export function ShareStrip({ segments, label, className }: ShareStripProps) {
  const total = segments.reduce((sum, s) => sum + Math.max(s.value, 0), 0);
  return (
    <div role="img" aria-label={label} className={cn("flex h-3 w-full gap-0.5", className)}>
      {total > 0 &&
        segments.map((s) => (
          <div
            key={s.key}
            className={cn("h-full min-w-0 first:rounded-l-button last:rounded-r-button", s.highlight ? "bg-accent-strong" : "bg-chart-neutral")}
            style={{ flexGrow: Math.max(s.value, 0) / total, flexBasis: 0 }}
          />
        ))}
    </div>
  );
}
