import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const selectVariants = cva(
  "w-full appearance-none rounded-button border border-surface-border bg-surface text-text placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 pl-3 pr-9 text-sm",
        md: "h-9 pl-3 pr-9 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const WRAPPER_PREFIXES = ["w-", "min-w-", "max-w-", "flex", "flex-", "basis-", "grow", "grow-", "shrink", "shrink-"];

function extractWrapperClasses(className?: string) {
  if (!className) return [] as string[];
  return className
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => {
      const base = token.split(":").pop() ?? token;
      return WRAPPER_PREFIXES.some((prefix) => base.startsWith(prefix));
    });
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, children, ...props }, ref) => {
    const wrapperClasses = extractWrapperClasses(className);
    return (
      <div className={cn("relative inline-flex", wrapperClasses.length ? wrapperClasses : "w-full")}>
        <select
          ref={ref}
          className={cn(selectVariants({ size, className }))}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 4.5L6 7.5L9 4.5" />
          </svg>
        </span>
      </div>
    );
  },
);
Select.displayName = "Select";
