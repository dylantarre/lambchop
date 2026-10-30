"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import { seriesColor } from "../lib/chart-style";

export interface BreakdownItem {
  label: string;
  value: number;
  color?: string;
}

export interface BreakdownListProps {
  items: BreakdownItem[];
  /** Format each value. Default: locale number. */
  format?: (value: number) => string;
  /** Show each item's share of the total with a thin bar. Default true. */
  showShare?: boolean;
  palette?: string[] | "categorical" | "brand";
  activeIndex?: number | null;
  onActiveIndexChange?: (index: number | null) => void;
  className?: string;
}

/**
 * A legend that carries the numbers: swatch, label, value and share.
 * Pairs with PieChart (shared activeIndex) or stands alone as a ranked list.
 */
export function BreakdownList({
  items,
  format = (v) => v.toLocaleString(),
  showShare = true,
  palette = "categorical",
  activeIndex = null,
  onActiveIndexChange,
  className,
}: BreakdownListProps) {
  const colors = useChartColors();
  const total = items.reduce((s, it) => s + (Number.isFinite(it.value) ? it.value : 0), 0);

  return (
    <ul className={cn("flex flex-col", className)}>
      {items.map((item, i) => {
        const share = total > 0 ? (item.value / total) * 100 : 0;
        const color = seriesColor(colors, i, palette, item.color);
        const dimmed = activeIndex != null && activeIndex !== i;
        return (
          <li
            key={`${item.label}-${i}`}
            className={cn(
              "group grid grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-button px-2 py-1.5 transition-opacity",
              dimmed && "opacity-40",
            )}
            onMouseEnter={() => onActiveIndexChange?.(i)}
            onMouseLeave={() => onActiveIndexChange?.(null)}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
            <span className="min-w-0 truncate text-sm text-text">{item.label}</span>
            <span className="flex items-baseline gap-2 tabular-nums">
              <span className="text-sm font-medium text-text">{format(item.value)}</span>
              {showShare && (
                <span className="w-12 text-right text-xs text-text-tertiary">
                  {share > 0 && share < 0.1 ? "<0.1" : share >= 10 ? share.toFixed(0) : share.toFixed(1)}%
                </span>
              )}
            </span>
            {showShare && (
              <span className="col-start-2 col-end-4 mt-1 h-1 overflow-hidden rounded-full bg-surface-tertiary">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${Math.max(share, 0.5)}%`, backgroundColor: color }}
                />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
