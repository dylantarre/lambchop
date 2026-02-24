import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  subDays,
  startOfYear,
  format,
} from "date-fns";
import { cn } from "../lib/cn";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DateRangePreset {
  label: string;
  value: string;
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  onPresetChange?: (preset: string) => void;
  presets?: DateRangePreset[];
  className?: string;
}

const DEFAULT_PRESETS: DateRangePreset[] = [
  { label: "MTD", value: "mtd" },
  { label: "Last Month", value: "last-month" },
  { label: "Last 30 Days", value: "last-30" },
  { label: "Last 90 Days", value: "last-90" },
  { label: "YTD", value: "ytd" },
  { label: "Custom", value: "custom" },
];

function resolvePreset(preset: string): DateRange | null {
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
    default:
      return null;
  }
}

export function DateRangePicker({
  value,
  onChange,
  onPresetChange,
  presets = DEFAULT_PRESETS,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = React.useState(false);
  const [customStart, setCustomStart] = React.useState(
    format(value.start, "yyyy-MM-dd"),
  );
  const [customEnd, setCustomEnd] = React.useState(
    format(value.end, "yyyy-MM-dd"),
  );

  const handlePresetClick = (preset: string) => {
    setActivePreset(preset);
    onPresetChange?.(preset);

    if (preset === "custom") {
      setShowCustomForm(true);
      setCustomStart(format(value.start, "yyyy-MM-dd"));
      setCustomEnd(format(value.end, "yyyy-MM-dd"));
      return;
    }

    setShowCustomForm(false);
    const range = resolvePreset(preset);
    if (range) {
      onChange(range);
      setOpen(false);
    }
  };

  const handleCustomApply = () => {
    const start = new Date(customStart + "T00:00:00");
    const end = new Date(customEnd + "T00:00:00");
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start <= end) {
      onChange({ start, end });
      setOpen(false);
      setShowCustomForm(false);
    }
  };

  const displayLabel = `${format(value.start, "MMM d, yyyy")} - ${format(value.end, "MMM d, yyyy")}`;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-button border border-surface-border bg-surface px-3 py-1.5",
            "text-sm text-text hover:bg-surface-hover",
            "outline-none focus:border-accent focus:ring-1 focus:ring-accent",
            className,
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-text-tertiary"
          >
            <path
              d="M5 1v2M11 1v2M1 6h14M3 3h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{displayLabel}</span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 rounded-card border border-surface-border bg-surface p-3 shadow-card",
            "animate-in fade-in-0 zoom-in-95",
            "w-64",
          )}
        >
          <div className="flex flex-col gap-1">
            {presets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handlePresetClick(preset.value)}
                className={cn(
                  "rounded-button px-3 py-1.5 text-left text-sm transition-colors",
                  activePreset === preset.value
                    ? "bg-accent-light text-accent-dark font-medium"
                    : "text-text hover:bg-surface-hover",
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {showCustomForm && (
            <div className="mt-3 flex flex-col gap-2 border-t border-surface-border pt-3">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-text-secondary">
                  Start date
                </span>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className={cn(
                    "rounded-button border border-surface-border bg-surface px-2 py-1",
                    "text-sm text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                  )}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium text-text-secondary">
                  End date
                </span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className={cn(
                    "rounded-button border border-surface-border bg-surface px-2 py-1",
                    "text-sm text-text outline-none focus:border-accent focus:ring-1 focus:ring-accent",
                  )}
                />
              </label>
              <button
                type="button"
                onClick={handleCustomApply}
                className={cn(
                  "mt-1 rounded-button bg-accent px-3 py-1.5 text-sm font-medium text-text-inverse",
                  "hover:bg-accent-dark transition-colors",
                )}
              >
                Apply
              </button>
            </div>
          )}

          <Popover.Arrow className="fill-surface-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
