import * as React from "react";
import { cn } from "../lib/cn";
import type { NavItem } from "./sidebar-nav";

export interface BottomNavProps {
  items: NavItem[];
  className?: string;
  ariaLabel?: string;
  fixed?: boolean;
}

export function BottomNav({
  items,
  className,
  ariaLabel = "Bottom navigation",
  fixed = true,
}: BottomNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "border-t border-surface-border bg-surface-secondary/95 backdrop-blur",
        "supports-[backdrop-filter]:bg-surface-secondary/85",
        fixed && "fixed inset-x-0 bottom-0 z-40",
        className,
      )}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      <ul className="grid auto-cols-fr grid-flow-col items-stretch gap-1 overflow-x-auto px-2 pt-2">
        {items.map((item) => (
          <li key={item.href} className="min-w-bottom-nav-item">
            <a
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex min-h-bottom-nav-item flex-col items-center justify-center gap-1 rounded-button px-2 py-2",
                "text-[11px] leading-tight transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-accent",
                item.active
                  ? "bg-surface-hover text-text font-medium"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text",
              )}
              title={item.label}
            >
              {item.icon && (
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center",
                    item.active ? "text-accent" : "text-text-tertiary",
                  )}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              <span className="max-w-full truncate">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
