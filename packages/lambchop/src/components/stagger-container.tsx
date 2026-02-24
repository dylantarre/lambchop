import * as React from "react";
import { cn } from "../lib/cn";
import { useIntersectionObserver } from "../hooks/use-intersection-observer";

export interface StaggerContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: number;
}

export function StaggerContainer({
  stagger = 100,
  className,
  children,
  ...props
}: StaggerContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ triggerOnce: true });

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties; className?: string }>, {
          style: {
            ...(child.props as { style?: React.CSSProperties }).style,
            transitionDelay: `${index * stagger}ms`,
            opacity: isIntersecting ? 1 : 0,
            transform: isIntersecting ? "translateY(0)" : "translateY(1rem)",
            transition: `opacity 0.5s ease-out, transform 0.5s ease-out`,
          },
        });
      })}
    </div>
  );
}
