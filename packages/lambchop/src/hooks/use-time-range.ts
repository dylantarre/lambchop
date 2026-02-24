import { useState, useMemo, useCallback } from "react";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  subDays,
  startOfYear,
  format,
} from "date-fns";

export type TimeRangePreset =
  | "mtd"
  | "last-month"
  | "last-30"
  | "last-90"
  | "ytd"
  | "custom";

export interface TimeRange {
  start: Date;
  end: Date;
  preset: TimeRangePreset;
}

function resolvePreset(preset: TimeRangePreset): { start: Date; end: Date } {
  const now = new Date();
  switch (preset) {
    case "mtd":
      return { start: startOfMonth(now), end: now };
    case "last-month": {
      const prev = subMonths(now, 1);
      return { start: startOfMonth(prev), end: endOfMonth(prev) };
    }
    case "last-30":
      return { start: subDays(now, 30), end: now };
    case "last-90":
      return { start: subDays(now, 90), end: now };
    case "ytd":
      return { start: startOfYear(now), end: now };
    case "custom":
      return { start: subDays(now, 30), end: now };
  }
}

export function useTimeRange(initialPreset: TimeRangePreset = "mtd") {
  const [preset, setPresetState] = useState<TimeRangePreset>(initialPreset);
  const [customRange, setCustomRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const range = useMemo<TimeRange>(() => {
    if (preset === "custom" && customRange) {
      return { ...customRange, preset };
    }
    return { ...resolvePreset(preset), preset };
  }, [preset, customRange]);

  const setPreset = useCallback((p: TimeRangePreset) => {
    setPresetState(p);
    if (p !== "custom") setCustomRange(null);
  }, []);

  const setCustom = useCallback((start: Date, end: Date) => {
    setPresetState("custom");
    setCustomRange({ start, end });
  }, []);

  const formatted = useMemo(
    () => ({
      start: format(range.start, "yyyy-MM-dd"),
      end: format(range.end, "yyyy-MM-dd"),
    }),
    [range],
  );

  return { range, preset, setPreset, setCustom, formatted };
}
