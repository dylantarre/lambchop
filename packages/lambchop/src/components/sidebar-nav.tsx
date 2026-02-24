import * as React from "react";
import { cn } from "../lib/cn";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface SidebarNavProps {
  items: NavItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SidebarNav({
  items,
  collapsed = false,
  onToggleCollapse,
  header,
  footer,
  className,
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex h-full flex-col border-r border-surface-border bg-surface-secondary",
        "transition-[width] duration-200 ease-in-out",
        collapsed ? "w-sidebar-collapsed" : "w-sidebar-w",
        className,
      )}
      aria-label="Sidebar navigation"
    >
      {header && (
        <div
          className={cn(
            "flex items-center border-b border-surface-border px-3 py-3",
            collapsed && "justify-center",
          )}
        >
          {header}
        </div>
      )}

      <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-button px-3 py-2 text-sm transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-accent",
                item.active
                  ? "bg-surface-hover text-text font-medium border-l-2 border-accent"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text border-l-2 border-transparent",
                collapsed && "justify-center px-2",
              )}
              aria-current={item.active ? "page" : undefined}
              title={collapsed ? item.label : undefined}
            >
              {item.icon && (
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center",
                    item.active ? "text-accent" : "text-text-tertiary",
                  )}
                >
                  {item.icon}
                </span>
              )}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>

      {footer}

      {onToggleCollapse && (
        <div className="border-t border-surface-border p-2">
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              "flex w-full items-center gap-3 rounded-button px-3 py-2 text-sm text-text-tertiary",
              "hover:bg-surface-hover hover:text-text transition-colors",
              "outline-none focus-visible:ring-2 focus-visible:ring-accent",
              collapsed && "justify-center px-2",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn(
                "shrink-0 transition-transform duration-200",
                collapsed && "rotate-180",
              )}
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      )}
    </nav>
  );
}
