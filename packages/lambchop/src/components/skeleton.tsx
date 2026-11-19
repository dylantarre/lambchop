import * as React from "react";
import { cn } from "../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Placeholder block for content that is loading. Size it to the content it
 * stands in for so nothing moves when the real content arrives. The pulse is
 * skipped under reduced motion.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block rounded-button bg-surface-border motion-safe:animate-skeleton", className)}
      {...props}
    />
  );
}
