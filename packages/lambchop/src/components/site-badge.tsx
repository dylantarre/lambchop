import * as React from "react";
import { Badge } from "./badge";
import { getSiteBrand } from "../lib/site-brands";

export interface SiteBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The site name (case-insensitive lookup against brand colors). */
  site: string;
}

/**
 * A Badge that automatically applies per-site brand colors.
 * Falls back to the default "primary" badge style if the site isn't recognized.
 */
export function SiteBadge({ site, className, ...props }: SiteBadgeProps) {
  const brand = getSiteBrand(site);
  return (
    <Badge
      variant="primary"
      className={className}
      style={brand ? { backgroundColor: brand.bg, color: brand.text } : undefined}
      {...props}
    >
      {site}
    </Badge>
  );
}
