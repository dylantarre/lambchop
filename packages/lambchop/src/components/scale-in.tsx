import * as React from "react";
import { cn } from "../lib/cn";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";

export interface ScaleInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function ScaleIn({
  delay = 0,
  className,
  children,
  ...props
}: ScaleInProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cn(
        isIntersecting ? "animate-scale-in" : "opacity-0",
        className,
      )}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
