import * as React from "react";
import { cn } from "../lib/cn";

export interface FooterColumn {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns: FooterColumn[];
  bottomContent?: React.ReactNode;
}

export function Footer({
  columns,
  bottomContent,
  className,
  ...props
}: FooterProps) {
  return (
    <footer className={cn("bg-foreground text-background", className)} {...props}>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display text-sm uppercase tracking-wider text-background/70">
                {col.heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/80 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t-2 border-background/20 pt-6">
          {bottomContent ?? (
            <p className="text-xs text-background/50">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
