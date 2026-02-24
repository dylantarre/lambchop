import * as React from "react";
import { cn } from "../lib/cn";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  notched?: boolean;
}

export function StatCard({ value, label, notched = false, className, ...props }: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card bg-foreground p-6 text-background",
        className,
      )}
      {...props}
    >
      {/* decorative corner dots */}
      <span className="absolute top-2 left-2 h-1 w-1 rounded-full bg-background/40" />
      <span className="absolute top-2 right-2 h-1 w-1 rounded-full bg-background/40" />
      <span className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-background/40" />
      <span className="absolute bottom-2 right-2 h-1 w-1 rounded-full bg-background/40" />

      {/* ticket notches */}
      {notched && (
        <>
          <span className="absolute left-0 top-1/2 h-5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
          <span className="absolute right-0 top-1/2 h-5 w-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
        </>
      )}

      <div className="font-display text-4xl uppercase tracking-wider">
        {value}
      </div>
      <div className="mt-1 text-sm uppercase tracking-wider text-background/70">
        {label}
      </div>
    </div>
  );
}
