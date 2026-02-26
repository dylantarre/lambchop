import * as React from "react";
import { cn } from "../lib/cn";
import { Button } from "./button";
import { Badge } from "./badge";

export interface PricingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: string;
  unit?: string;
  description?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  featured?: boolean;
  badge?: string;
}

export function PricingCard({
  name,
  price,
  unit = "/mo",
  description,
  features,
  ctaLabel = "Get Started",
  ctaHref,
  onCtaClick,
  featured = false,
  badge,
  className,
  ...props
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-card border-2 p-6",
        featured
          ? "border-primary bg-foreground text-background"
          : "border-foreground/40",
        className,
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl uppercase tracking-wider">
          {name}
        </h3>
        {badge && (
          <Badge variant={featured ? "primary" : "default"}>{badge}</Badge>
        )}
      </div>

      <div className="mb-4">
        <span className="font-display text-4xl">{price}</span>
        {unit && (
          <span className={cn("text-sm", featured ? "text-background/70" : "text-muted-foreground")}>
            {unit}
          </span>
        )}
      </div>

      {description && (
        <div className={cn(
          "mb-6 border-y-2 py-3 text-sm",
          featured ? "border-background/20" : "border-foreground/20",
        )}>
          {description}
        </div>
      )}

      <ul className="mb-6 flex-1 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <svg
              className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-primary" : "text-foreground")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2l2.39 4.843L17.5 7.72l-3.75 3.657.885 5.163L10 14.058 5.365 16.54l.885-5.163L2.5 7.72l5.11-.877L10 2z" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={featured ? "primary" : "secondary"}
        className="w-full"
        onClick={onCtaClick}
        {...(ctaHref ? { asChild: true } : {})}
      >
        {ctaHref ? <a href={ctaHref}>{ctaLabel}</a> : ctaLabel}
      </Button>
    </div>
  );
}
