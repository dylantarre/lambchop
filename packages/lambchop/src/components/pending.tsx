import * as React from "react";
import { cn } from "../lib/cn";
import { Skeleton } from "./skeleton";

export interface PendingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** True while the content's next value is loading. */
  pending: boolean;
  /** Placeholder shown over the reserved space. Defaults to one full-size skeleton block. */
  placeholder?: React.ReactNode;
  /** Render as an inline element (for a single value inside a line of text). */
  inline?: boolean;
}

/**
 * Holds a region's exact size while its next value loads, so a filter or
 * period change never collapses the page.
 *
 * The previous content stays mounted only to reserve layout: it is hidden
 * instantly, removed from the accessibility tree and made inert, so a reader
 * never sees one selection's numbers under another selection's label. When the
 * new content arrives it fades in over `base` (opacity only).
 */
export function Pending({ pending, placeholder, inline, className, children, ...props }: PendingProps) {
  const Tag = inline ? "span" : "div";
  return (
    <Tag className={cn("relative", inline ? "inline-block" : "block", className)} aria-busy={pending || undefined} {...props}>
      <Tag
        aria-hidden={pending || undefined}
        // `inert` keeps hidden stale controls out of the tab order.
        {...(pending ? { inert: true } : {})}
        className={cn(
          inline ? "inline-block" : "block",
          pending ? "opacity-0" : "opacity-100 motion-safe:animate-reveal",
        )}
      >
        {children}
      </Tag>
      {pending && (
        <Tag aria-hidden="true" className={cn("absolute inset-0", inline ? "flex items-center" : "block")}>
          {placeholder ?? <Skeleton className="h-full w-full" />}
        </Tag>
      )}
    </Tag>
  );
}
