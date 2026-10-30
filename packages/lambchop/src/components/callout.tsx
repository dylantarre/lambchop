import * as React from "react";
import { cn } from "../lib/cn";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Small uppercase eyebrow, e.g. "Insight" or "Takeaway". */
  label?: string;
  tone?: "accent" | "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

const toneRule: Record<NonNullable<CalloutProps["tone"]>, string> = {
  accent: "border-l-accent",
  positive: "border-l-revenue",
  negative: "border-l-loss",
  neutral: "border-l-surface-border",
};

const toneLabel: Record<NonNullable<CalloutProps["tone"]>, string> = {
  accent: "text-accent",
  positive: "text-revenue",
  negative: "text-loss",
  neutral: "text-text-tertiary",
};

/** A highlighted paragraph for a takeaway or summary next to data. */
export function Callout({
  label,
  tone = "accent",
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-surface-border border-l-[3px] bg-surface-secondary px-4 py-3",
        toneRule[tone],
        className,
      )}
      {...props}
    >
      {label && (
        <div className={cn("mb-1 flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.14em]", toneLabel[tone])}>
          {icon}
          {label}
        </div>
      )}
      <div className="text-base leading-relaxed text-text-secondary [&_strong]:font-semibold [&_strong]:text-text">
        {children}
      </div>
    </div>
  );
}
