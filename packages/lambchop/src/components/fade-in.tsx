import * as React from "react";
import { cn } from "../lib/cn";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

const directionMap = {
  up: "animate-fade-in-up",
  down: "animate-fade-in-down",
  left: "animate-fade-in-left",
  right: "animate-fade-in-right",
} as const;

export function FadeIn({
  direction = "up",
  delay = 0,
  className,
  children,
  ...props
}: FadeInProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        isIntersecting ? directionMap[direction] : "opacity-0",
        className,
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
