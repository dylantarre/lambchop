"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { useChartColors } from "../lib/use-chart-colors";

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  className?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color,
  fillOpacity = 0.1,
  className,
}: SparklineProps) {
  const chartColors = useChartColors();
  const resolvedColor = color ?? chartColors.accent;

  if (data.length === 0) {
    return (
      <svg
        width={width}
        height={height}
        className={cn("inline-block", className)}
      />
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const padding = 1;
  const viewWidth = width;
  const viewHeight = height;
  const plotWidth = viewWidth - padding * 2;
  const plotHeight = viewHeight - padding * 2;

  const points = data.map((value, index) => {
    const x = padding + (index / Math.max(data.length - 1, 1)) * plotWidth;
    const y = padding + plotHeight - ((value - min) / range) * plotHeight;
    return { x, y };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const fillPoints = [
    `${points[0].x},${padding + plotHeight}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${padding + plotHeight}`,
  ].join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      className={cn("inline-block", className)}
      role="img"
      aria-label="Sparkline chart"
    >
      <polygon
        points={fillPoints}
        fill={resolvedColor}
        opacity={fillOpacity}
      />
      <polyline
        points={linePoints}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
