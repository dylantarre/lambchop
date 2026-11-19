import * as React from "react";
import { cn } from "../lib/cn";

export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this option is on. Announced via aria-pressed. */
  selected: boolean;
  /** "sm" for filters inside a card header, "md" for page-level filters. */
  size?: "sm" | "md";
}

const SIZES = {
  // 20px tall visually; the hit area extends 12px above and below to 44px.
  sm: "px-2 py-0.5 text-xs before:-inset-y-3",
  // 28px tall visually (26px inside the 1px border); the hit area extends 10px
  // above and below, measured from the padding box, to at least 44px.
  md: "px-3 py-1 text-sm before:-inset-y-2.5",
} as const;

/**
 * Toggle button styled as a pill, for filters. Announces its state with
 * aria-pressed, keeps a 44px touch target without looking larger (an
 * invisible ::before extends the hit area vertically), and shows a
 * focus-visible ring in accent-strong. Colors change at `fast`.
 */
export function Pill({ selected, size = "md", className, type = "button", ...props }: PillProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "relative inline-flex items-center rounded-full transition-colors duration-fast ease-move",
        "before:absolute before:inset-x-0 before:content-['']",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        SIZES[size],
        selected
          ? "bg-accent-strong font-medium text-surface"
          : size === "sm"
            ? "bg-surface-hover text-text-secondary hover:text-text"
            : "border border-surface-border bg-surface text-text-secondary hover:text-text",
        className,
      )}
      {...props}
    />
  );
}

export interface PillGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Names the group for screen readers, e.g. "Filter by site". */
  label: string;
}

/** Labelled row of Pills. */
export function PillGroup({ label, className, ...props }: PillGroupProps) {
  return <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)} {...props} />;
}
