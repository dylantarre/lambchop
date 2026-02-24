import * as React from "react";
import { cn } from "../lib/cn";

export interface LogoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: Array<{ src: string; alt: string; href?: string }>;
  columns?: 3 | 4 | 5 | 6;
}

const colsMap = {
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-3 sm:grid-cols-6",
} as const;

export function LogoGrid({
  logos,
  columns = 4,
  className,
  ...props
}: LogoGridProps) {
  return (
    <div
      className={cn("grid items-center gap-8", colsMap[columns], className)}
      {...props}
    >
      {logos.map((logo) => {
        const img = (
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 hover:scale-110"
          />
        );
        return (
          <div key={logo.alt} className="flex items-center justify-center">
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            ) : (
              img
            )}
          </div>
        );
      })}
    </div>
  );
}
