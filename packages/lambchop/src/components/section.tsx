import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const sectionVariants = cva("py-16 md:py-24", {
  variants: {
    variant: {
      default: "",
      muted: "bg-muted/30",
      bordered: "border-y-2 border-foreground/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  noContainer?: boolean;
}

export function Section({
  className,
  variant,
  noContainer = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ variant }), className)} {...props}>
      {noContainer ? children : (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
      )}
    </section>
  );
}
