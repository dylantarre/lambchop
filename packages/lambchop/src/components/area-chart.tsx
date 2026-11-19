"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
} from "recharts";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";
import { seriesColor, tooltipStyle } from "../lib/chart-style";
import { motion } from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";

export interface AreaDefinition {
  key: string;
  label: string;
  color?: string;
}

export interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  areas: AreaDefinition[];
  height?: number;
  stacked?: boolean;
  className?: string;
  xTickFormatter?: (value: string) => string;
  yTickFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  tooltipLabelFormatter?: (value: string) => string;
  /** Series palette. Default "brand". */
  palette?: string[] | "categorical" | "brand";
  /** Show the legend. Default: only when there is more than one series (the title names a single series). */
  showLegend?: boolean;
  /**
   * Line shape. "linear" draws straight segments between data points so the
   * line never implies values between them (use it for daily figures).
   * Default "monotone".
   */
  curve?: "monotone" | "linear";
  /** Explicit x-axis tick values (e.g. month starts on a long daily series). */
  xTicks?: string[];
  /**
   * Label the highest point of the first series directly on the chart.
   * Receives the point's x value and y value, returns the label text.
   */
  annotateMax?: (x: string, value: number) => string;
  /** One-sentence description for screen readers, e.g. "Daily earnings, Nov 1 to Nov 17. Highest: Nov 6, $42.40." */
  summary?: string;
}

export function AreaChart({
  data,
  xKey,
  areas,
  height = 300,
  stacked = true,
  className,
  xTickFormatter,
  yTickFormatter,
  tooltipFormatter,
  tooltipLabelFormatter,
  palette = "brand",
  showLegend,
  curve = "monotone",
  xTicks,
  annotateMax,
  summary,
}: AreaChartProps) {
  const gradientId = React.useId();
  const colors = useChartColors();
  const reduced = usePrefersReducedMotion();
  // Stacking needs at least two series; a single series reads as a line with a light fill.
  const isStacked = stacked && areas.length > 1;
  const legendVisible = showLegend ?? areas.length > 1;
  const peak = React.useMemo(() => {
    if (!annotateMax || data.length === 0) return null;
    const key = areas[0]?.key;
    let best: Record<string, unknown> | null = null;
    for (const row of data) {
      if (best === null || Number(row[key]) > Number(best[key])) best = row;
    }
    return best ? { x: String(best[xKey]), y: Number(best[key]) } : null;
  }, [annotateMax, data, areas, xKey]);
  const [hidden, setHidden] = React.useState<Set<string>>(new Set());
  // While the pointer reads the chart the tooltip carries the detail, so the
  // peak label steps aside instead of colliding with it. Toggled as a DOM
  // attribute (not React state) so hovering never re-renders a long series.
  const frameRef = React.useRef<HTMLDivElement>(null);
  const setReading = (on: boolean) => {
    const el = frameRef.current;
    if (el && el.dataset.reading !== String(on)) el.dataset.reading = String(on);
  };

  const toggleSeries = React.useCallback((dataKey: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(dataKey)) next.delete(dataKey);
      else next.add(dataKey);
      return next;
    });
  }, []);

  const srTable = React.useMemo(() => (
      <table className="sr-only">
          <caption>{summary ?? areas.map((a) => a.label).join(", ")}</caption>
          <thead>
            <tr>
              <th scope="col">{xKey}</th>
              {areas.map((a) => <th key={a.key} scope="col">{a.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <th scope="row">{tooltipLabelFormatter ? tooltipLabelFormatter(String(row[xKey])) : String(row[xKey])}</th>
                {areas.map((a) => (
                  <td key={a.key}>{tooltipFormatter ? tooltipFormatter(Number(row[a.key])) : String(row[a.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  ), [data, areas, xKey, summary, tooltipLabelFormatter, tooltipFormatter]);

  return (
    <div
      ref={frameRef}
      className={cn(
        "w-full [&_.recharts-reference-dot_.recharts-label]:transition-opacity [&_.recharts-reference-dot_.recharts-label]:duration-fast",
        "[&[data-reading=true]_.recharts-reference-dot_.recharts-label]:opacity-0",
        className,
      )}
    >
      <div role="img" aria-label={summary ?? `Area chart of ${areas.map((a) => a.label).join(", ")}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: peak ? 28 : 8, right: 24, left: 0, bottom: 0 }}
          onMouseMove={(state) => setReading(Boolean(state?.isTooltipActive))}
          onMouseLeave={() => setReading(false)}
        >
          <defs>
            {areas.map((area, index) => {
              const color =
                seriesColor(colors, index, palette, area.color);
              return (
                <linearGradient
                  key={area.key}
                  id={`${gradientId}-${area.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={isStacked ? 0.85 : 0.22} />
                  <stop offset="95%" stopColor={color} stopOpacity={isStacked ? 0.7 : 0.02} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.grid}
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={{ stroke: colors.grid }}
            tickLine={false}
            tickFormatter={xTickFormatter}
            minTickGap={24}
            ticks={xTicks}
            interval={xTicks ? 0 : data.length <= 12 ? "equidistantPreserveStart" : "preserveStartEnd"}
          />
          <YAxis
            tick={{ fontSize: 12, fill: colors.tick }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
            width={56}
          />
          <Tooltip
            cursor={{ stroke: colors.cursor, strokeWidth: 1 }}
            isAnimationActive={!reduced}
            animationDuration={motion.duration.fast}
            animationEasing="ease-out"
            content={(props) => (
              <SeriesTooltip
                active={props.active}
                label={props.label}
                payload={(props.payload ?? []) as unknown as TooltipItem[]}
                colors={colors}
                showSeries={areas.length > 1}
                labelFormatter={tooltipLabelFormatter}
                valueFormatter={tooltipFormatter}
                reverse={isStacked}
              />
            )}
          />
          {legendVisible && <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8, cursor: "pointer" }}
            iconType="circle"
            iconSize={8}
            onClick={(e) => e.dataKey && toggleSeries(e.dataKey as string)}
            formatter={(value, entry) => (
              <span style={{ color: colors.tick, opacity: hidden.has(entry.dataKey as string) ? 0.4 : 1 }}>{value}</span>
            )}
            payload={isStacked
              ? [...areas].reverse().map((area, i) => {
                  const origIndex = areas.length - 1 - i;
                  const color = seriesColor(colors, origIndex, palette, area.color);
                  return { value: area.label, type: "circle" as const, id: area.key, dataKey: area.key, color, inactive: hidden.has(area.key) };
                })
              : undefined
            }
          />}
          {areas.map((area, index) => {
            const color =
              seriesColor(colors, index, palette, area.color);
            return (
              <Area
                key={area.key}
                dataKey={area.key}
                name={area.label}
                type={curve}
                stroke={color}
                strokeWidth={isStacked ? 1.5 : 2}
                fill={isStacked ? color : `url(#${gradientId}-${area.key})`}
                fillOpacity={isStacked ? 0.75 : 1}
                stackId={isStacked ? "stack" : undefined}
                dot={false}
                // Range changes crossfade via the surrounding layout (see Pending);
                // morphing one range's line into another's would show values that never existed.
                isAnimationActive={false}
                hide={hidden.has(area.key)}
                activeDot={{
                  r: 4,
                  fill: color,
                  stroke: colors.activeDot,
                  strokeWidth: 2,
                }}
              />
            );
          })}
          {peak && annotateMax && (
            <ReferenceDot
              x={peak.x}
              y={peak.y}
              r={4}
              fill={seriesColor(colors, 0, palette, areas[0]?.color)}
              stroke={colors.activeDot}
              strokeWidth={2}
              ifOverflow="extendDomain"
              label={{
                value: annotateMax(peak.x, peak.y),
                position: "top",
                offset: 10,
                fontSize: 12,
                fontWeight: 600,
                fill: colors.tooltipText,
              }}
            />
          )}
        </RechartsAreaChart>
      </ResponsiveContainer>
      </div>
      {srTable}
    </div>
  );
}

interface TooltipItem {
  dataKey?: string | number;
  name?: string;
  value?: number;
  color?: string;
}

/** Date first, then the value large enough to read at a glance. Series names only when there are several. */
function SeriesTooltip({
  active, label, payload, colors, showSeries, labelFormatter, valueFormatter, reverse,
}: {
  active?: boolean;
  label?: unknown;
  payload: TooltipItem[];
  colors: ReturnType<typeof useChartColors>;
  showSeries: boolean;
  labelFormatter?: (value: string) => string;
  valueFormatter?: (value: number) => string;
  reverse: boolean;
}) {
  if (!active || payload.length === 0) return null;
  const items = reverse ? [...payload].reverse() : payload;
  const fmt = (v: unknown) => (valueFormatter ? valueFormatter(Number(v)) : String(v));
  return (
    <div style={tooltipStyle(colors)}>
      <div style={{ fontSize: 12, color: colors.tick, marginBottom: 2 }}>
        {labelFormatter ? labelFormatter(String(label)) : String(label)}
      </div>
      {items.map((item) => (
        <div key={String(item.dataKey)} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          {showSeries && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: colors.tick }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: item.color }} />
              {item.name}
            </span>
          )}
          <span style={{ fontSize: showSeries ? 12 : 16, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {fmt(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
