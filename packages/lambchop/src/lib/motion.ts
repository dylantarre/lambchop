/**
 * Motion tokens. One source for the Tailwind preset (CSS) and for components
 * that animate from JavaScript, so a duration means the same thing everywhere.
 *
 * Motion in Lambchop explains a change; it never decorates. Keep UI motion
 * between `fast` and `slow`, animate transform and opacity only, and give every
 * animation a reduced-motion path (Tailwind `motion-safe:` / `usePrefersReducedMotion`).
 */
export const motion = {
  duration: {
    /** Hover, press, toggle feedback. */
    fast: 120,
    /** Content entering, values settling, tooltips. */
    base: 200,
    /** Things travelling a distance: rows re-ranking, panels. */
    slow: 300,
  },
  easing: {
    /** Arriving and coming to rest (decelerate). */
    enter: "cubic-bezier(0.2, 0, 0, 1)",
    /** Leaving (accelerate away). Exits run at `fast`. */
    exit: "cubic-bezier(0.4, 0, 1, 1)",
    /** Moving between two on-screen states. */
    move: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  /** Delay between siblings in a staggered reveal. */
  stagger: 40,
} as const;

export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

/** Cubic-bezier evaluator for JS-driven tweens that must match a CSS easing token. */
export function bezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
  const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const y = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (progress: number) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    let t = progress;
    for (let i = 0; i < 6; i++) {
      const err = x(t) - progress;
      const d = dx(t);
      if (Math.abs(err) < 1e-5 || d === 0) break;
      t -= err / d;
    }
    return y(Math.min(1, Math.max(0, t)));
  };
}

export const easeEnter = bezier(0.2, 0, 0, 1);
export const easeMove = bezier(0.4, 0, 0.2, 1);
