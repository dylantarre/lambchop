import * as React from "react";
import { cn } from "../lib/cn";
import { Button } from "./button";

export interface ErrorStateProps {
  /** What failed, in the reader's terms: "Your dashboard didn't load". */
  title: string;
  /** Why, if known, and what still works. Keep raw technical errors out. */
  description?: React.ReactNode;
  /** Offer a retry. The button shows progress while `retrying`. */
  onRetry?: () => void;
  retrying?: boolean;
  retryLabel?: string;
  className?: string;
}

/**
 * In-place failure message for a region or a page. Announced as an alert,
 * keeps the surrounding layout, and offers the next step instead of a dead
 * end. Enters with `enter` (base, ease-enter); no motion under reduced motion.
 */
export function ErrorState({ title, description, onRetry, retrying = false, retryLabel = "Try again", className }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-start gap-3 rounded-card border border-loss/40 bg-loss-bg p-card-p motion-safe:animate-enter",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" className="mt-0.5 shrink-0 text-loss">
          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 5.75v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="10" cy="13.75" r="1" fill="currentColor" />
        </svg>
        <div className="space-y-1">
          <p className="text-base font-semibold text-text">{title}</p>
          {description && <div className="text-sm text-text-secondary">{description}</div>}
        </div>
      </div>
      {onRetry && (
        <Button size="sm" onClick={onRetry} disabled={retrying} aria-busy={retrying || undefined} className="ml-8">
          {retrying ? "Retrying…" : retryLabel}
        </Button>
      )}
    </div>
  );
}
