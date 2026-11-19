"use client";

import * as React from "react";
import { motion } from "../lib/motion";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export interface UseFlipOptions {
  /**
   * CSS selector for the items that should travel to their new position.
   * Every other item fades in where it lands. When most of a list reorders at
   * once, sliding everything produces a tangle of crossing rows; travelling
   * only the item the viewer is following (their own row) keeps the change
   * readable. Default: every item travels.
   */
  follow?: string;
}

/**
 * Animates list reordering (FLIP). Mark each item with `data-flip-key`; when
 * `deps` change, followed items slide from their old position to their new one
 * (slow, ease-move) and the rest fade in (base, ease-enter). Transform and
 * opacity only, via the Web Animations API, so the list is laid out once in its
 * final order. Reduced motion: items simply appear in place.
 */
export function useFlip<T extends HTMLElement>(
  container: React.RefObject<T | null>,
  deps: React.DependencyList,
  { follow }: UseFlipOptions = {},
) {
  const reduced = usePrefersReducedMotion();
  const positions = React.useRef(new Map<string, number>());

  React.useLayoutEffect(() => {
    const root = container.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top - root.scrollTop;
    const hadLayout = positions.current.size > 0;
    const next = new Map<string, number>();
    root.querySelectorAll<HTMLElement>("[data-flip-key]").forEach((item) => {
      const key = item.dataset.flipKey!;
      const top = item.getBoundingClientRect().top - rootTop;
      next.set(key, top);
      if (reduced || !hadLayout) return;
      const before = positions.current.get(key);
      const moved = before !== undefined && Math.abs(before - top) > 0.5;
      const travels = !follow || item.matches(follow);
      if (moved && travels) {
        item.animate(
          [{ transform: `translateY(${before - top}px)` }, { transform: "translateY(0)" }],
          { duration: motion.duration.slow, easing: motion.easing.move },
        );
      } else if (moved || before === undefined) {
        item.animate([{ opacity: 0 }, { opacity: 1 }], { duration: motion.duration.base, easing: motion.easing.enter });
      }
    });
    positions.current = next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
