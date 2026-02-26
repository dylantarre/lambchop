import * as React from "react";
import { cn } from "../lib/cn";
import { BottomNav } from "./bottom-nav";
import { SidebarNav, type SidebarNavProps } from "./sidebar-nav";

export type ResponsiveNavBreakpoint =
  | "tablet"
  | "nav"
  | "desktop"
  | "lg"
  | "xl";

export interface ResponsiveSidebarNavProps extends SidebarNavProps {
  mobileVariant?: "bottom-nav" | "none";
  desktopBreakpoint?: ResponsiveNavBreakpoint;
  mobileNavClassName?: string;
  mobileNavAriaLabel?: string;
  reserveMobileSpace?: boolean;
}

const breakpointVisibilityClasses: Record<
  ResponsiveNavBreakpoint,
  { desktop: string; mobile: string }
> = {
  tablet: {
    desktop: "hidden tablet:flex",
    mobile: "tablet:hidden",
  },
  nav: {
    desktop: "hidden nav:flex",
    mobile: "nav:hidden",
  },
  desktop: {
    desktop: "hidden desktop:flex",
    mobile: "desktop:hidden",
  },
  lg: {
    desktop: "hidden lg:flex",
    mobile: "lg:hidden",
  },
  xl: {
    desktop: "hidden xl:flex",
    mobile: "xl:hidden",
  },
};

export function ResponsiveSidebarNav({
  items,
  collapsed = false,
  onToggleCollapse,
  header,
  footer,
  className,
  mobileVariant = "bottom-nav",
  desktopBreakpoint = "nav",
  mobileNavClassName,
  mobileNavAriaLabel,
  reserveMobileSpace = true,
}: ResponsiveSidebarNavProps) {
  const visibility = breakpointVisibilityClasses[desktopBreakpoint];
  const showMobileBottomNav = mobileVariant === "bottom-nav";

  return (
    <>
      <SidebarNav
        items={items}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        header={header}
        footer={footer}
        className={cn(visibility.desktop, className)}
      />

      {showMobileBottomNav && (
        <>
          {reserveMobileSpace && (
            <div
              aria-hidden="true"
              className={cn("h-bottom-nav-h", visibility.mobile)}
              style={{
                height: "calc(5.5rem + env(safe-area-inset-bottom))",
              }}
            />
          )}
          <BottomNav
            items={items}
            ariaLabel={mobileNavAriaLabel}
            className={cn(visibility.mobile, mobileNavClassName)}
          />
        </>
      )}
    </>
  );
}
