"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";

export interface ValueTransitionProps {
  /** The formatted value to show. */
  value: React.ReactNode;
  /** The number behind `value`. Sets the direction: up rolls in from below, down from above. */
  numeric?: number;
  /**
   * Whether the previous value was visible when this one arrived. When false
   * (it was hidden while loading) the old value is not brought back to animate out.
   */
  previousVisible?: boolean;
  className?: string;
}

interface Layer {
  id: number;
  node: React.ReactNode;
  shift: string;
  leaving: boolean;
}

/**
 * Swaps a displayed value with a short directional roll instead of a snap or a
 * count-up. Every frame shows a real value: counting would flash amounts that
 * never existed (a payout of $301.12 on the way to $483.23), which a money
 * dashboard should not do.
 *
 * Enter: base (200ms), ease-enter. Exit: fast (120ms), ease-exit. Transform and
 * opacity only. Reduced motion: an instant swap.
 */
export function ValueTransition({ value, numeric, previousVisible = true, className }: ValueTransitionProps) {
  const reduced = usePrefersReducedMotion();
  const key = typeof value === "string" || typeof value === "number" ? String(value) : numeric;
  const last = React.useRef<{ key: unknown; numeric?: number }>({ key, numeric });
  const nextId = React.useRef(1);
  const [layers, setLayers] = React.useState<Layer[]>([{ id: 0, node: value, shift: "0", leaving: false }]);

  React.useLayoutEffect(() => {
    if (Object.is(last.current.key, key)) {
      // Same value, possibly a re-render with a new element: refresh in place.
      setLayers((ls) => ls.map((l) => (l.leaving ? l : { ...l, node: value })));
      return;
    }
    const prev = last.current.numeric;
    last.current = { key, numeric };
    const dir = prev === undefined || numeric === undefined || numeric === prev ? 0 : numeric > prev ? 1 : -1;
    // Rolling up means the new value comes from below (positive Y).
    const shift = dir === 0 ? "0" : dir > 0 ? "0.4em" : "-0.4em";
    if (reduced) {
      setLayers([{ id: nextId.current++, node: value, shift: "0", leaving: false }]);
      return;
    }
    setLayers((ls) => [
      ...(previousVisible ? ls.filter((l) => !l.leaving).map((l) => ({ ...l, leaving: true, shift })) : []),
      { id: nextId.current++, node: value, shift, leaving: false },
    ]);
  }, [key, numeric, value, previousVisible, reduced]);

  const drop = (id: number) => setLayers((ls) => ls.filter((l) => l.id !== id));

  return (
    <span className={cn("inline-grid overflow-hidden align-bottom [&>*]:[grid-area:1/1]", className)}>
      {layers.map((l) => (
        <span
          key={l.id}
          aria-hidden={l.leaving || undefined}
          style={{ "--lmbchp-value-shift": l.shift } as React.CSSProperties}
          className={cn(
            "block whitespace-nowrap",
            l.leaving ? "animate-value-out" : l.id === 0 ? "" : "motion-safe:animate-value-in",
          )}
          onAnimationEnd={l.leaving ? () => drop(l.id) : undefined}
        >
          {l.node}
        </span>
      ))}
    </span>
  );
}
