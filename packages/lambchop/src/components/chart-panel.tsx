import * as React from "react";
import { cn } from "../lib/cn";

export interface ChartPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Panel heading, rendered in the display face like dashboard cards. */
  title?: React.ReactNode;
  /** One line under the title: period, unit, or what the chart answers. */
  subtitle?: React.ReactNode;
  /** Right-aligned slot in the header (a headline number, a badge, controls). */
  aside?: React.ReactNode;
  /** Footer slot under the content (source note, legend, caption). */
  footer?: React.ReactNode;
  /** Remove inner padding around children (for full-bleed tables). */
  flush?: boolean;
}

/**
 * The standard frame for a chart, table or breakdown: a bordered surface
 * with a display-face title, optional subtitle and an aside slot.
 */
export function ChartPanel({
  title,
  subtitle,
  aside,
  footer,
  flush = false,
  className,
  children,
  ...props
}: ChartPanelProps) {
  const hasHeader = title || subtitle || aside;
  return (
    <section
      className={cn(
        "flex h-full flex-col rounded-card border border-surface-border bg-surface-secondary",
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <header className="flex items-start justify-between gap-4 px-5 pt-4">
          <div className="min-w-0">
            {title && (
              <h3 className="font-display text-xl uppercase leading-none tracking-wider text-text">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1.5 text-xs text-text-tertiary">{subtitle}</p>
            )}
          </div>
          {aside && <div className="flex-shrink-0 text-right">{aside}</div>}
        </header>
      )}
      <div className={cn("min-w-0 flex-1", flush ? "pt-3" : "px-4 pb-4 pt-3")}>{children}</div>
      {footer && (
        <footer className="border-t border-surface-border px-5 py-2.5 text-xs text-text-tertiary">
          {footer}
        </footer>
      )}
    </section>
  );
}
