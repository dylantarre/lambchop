"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { PieChart } from "./pie-chart";
import { BreakdownList, type BreakdownItem } from "./breakdown-list";

export interface DonutBreakdownProps {
  items: BreakdownItem[];
  format?: (value: number) => string;
  /** Label under the total in the donut hole. Default "Total". */
  totalLabel?: string;
  /** Fold slices beyond this count into "Other". Default 8 (the palette size). */
  maxSlices?: number;
  height?: number;
  className?: string;
}

/** Donut plus a value legend, linked on hover. Sorted largest first. */
export function DonutBreakdown({
  items,
  format = (v) => v.toLocaleString(),
  totalLabel = "Total",
  maxSlices = 8,
  height = 240,
  className,
}: DonutBreakdownProps) {
  const [active, setActive] = React.useState<number | null>(null);
  // Lay out by the panel's own width, not the viewport: side by side only when roomy.
  const ref = React.useRef<HTMLDivElement>(null);
  const [wide, setWide] = React.useState(true);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => setWide(entry.contentRect.width >= 600));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const folded = React.useMemo(() => {
    const sorted = [...items]
      .filter((it) => Number.isFinite(it.value) && it.value > 0)
      .sort((a, b) => b.value - a.value);
    if (sorted.length <= maxSlices) return sorted;
    const head = sorted.slice(0, maxSlices - 1);
    const rest = sorted.slice(maxSlices - 1).reduce((s, it) => s + it.value, 0);
    return [...head, { label: `Other (${sorted.length - maxSlices + 1})`, value: rest }];
  }, [items, maxSlices]);

  const total = folded.reduce((s, it) => s + it.value, 0);

  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-6",
        wide ? "grid-cols-[minmax(200px,260px)_1fr]" : "grid-cols-1",
        className,
      )}
    >
      <PieChart
        data={folded.map((it) => ({ label: it.label, value: it.value }))}
        palette="categorical"
        showLegend={false}
        height={height}
        centerValue={format(total)}
        centerLabel={totalLabel}
        tooltipFormatter={format}
        activeIndex={active}
        onActiveIndexChange={setActive}
      />
      <BreakdownList
        items={folded}
        format={format}
        palette="categorical"
        activeIndex={active}
        onActiveIndexChange={setActive}
      />
    </div>
  );
}
