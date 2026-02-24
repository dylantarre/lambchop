import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { cn } from "../lib/cn";

export interface FilterDef {
  id: string;
  label: string;
  options: { label: string; value: string }[];
  multiple?: boolean;
}

export interface FilterBarProps {
  filters: FilterDef[];
  values: Record<string, string | string[]>;
  onChange: (id: string, value: string | string[]) => void;
  onClear?: () => void;
  className?: string;
}

function FilterDropdownSingle({
  filter,
  value,
  onChange,
}: {
  filter: FilterDef;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select.Root value={value || undefined} onValueChange={onChange}>
      <Select.Trigger
        aria-label={filter.label}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-button border border-surface-border bg-surface px-3 py-1.5",
          "text-sm outline-none hover:bg-surface-hover",
          "focus:border-accent focus:ring-1 focus:ring-accent",
          value ? "text-text" : "text-text-tertiary",
        )}
      >
        <Select.Value placeholder={filter.label} />
        <Select.Icon>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-text-muted"
          >
            <path
              d="M3 4.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={cn(
            "z-50 overflow-hidden rounded-card border border-surface-border bg-surface shadow-card",
            "animate-in fade-in-0 zoom-in-95",
          )}
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport className="p-1">
            {filter.options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "cursor-pointer rounded-button px-3 py-1.5 text-sm text-text outline-none",
                  "data-[highlighted]:bg-surface-hover",
                  "data-[state=checked]:font-medium data-[state=checked]:text-accent",
                )}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function FilterDropdownMultiple({
  filter,
  value,
  onChange,
}: {
  filter: FilterDef;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (optionValue: string) => {
    const next = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(next);
  };

  const selectedLabels = filter.options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-button border border-surface-border bg-surface px-3 py-1.5",
          "text-sm outline-none hover:bg-surface-hover",
          "focus:border-accent focus:ring-1 focus:ring-accent",
          value.length > 0 ? "text-text" : "text-text-tertiary",
        )}
      >
        <span>
          {value.length === 0
            ? filter.label
            : selectedLabels.length <= 2
              ? selectedLabels.join(", ")
              : `${selectedLabels[0]} +${selectedLabels.length - 1}`}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-text-muted"
        >
          <path
            d="M3 4.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "absolute left-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-card border border-surface-border bg-surface p-1 shadow-card",
            )}
          >
            {filter.options.map((option) => {
              const checked = value.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleToggle(option.value)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-button px-3 py-1.5 text-left text-sm text-text outline-none",
                    "hover:bg-surface-hover",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded border",
                      checked
                        ? "border-accent bg-accent text-text-inverse"
                        : "border-surface-border bg-surface",
                    )}
                  >
                    {checked && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ActiveFilterBadge({
  filter,
  value,
}: {
  filter: FilterDef;
  value: string | string[];
}) {
  const count = Array.isArray(value) ? value.length : value ? 1 : 0;
  if (count === 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-accent-light px-2 py-0.5 text-xs font-medium text-accent-dark",
      )}
    >
      {filter.label}
      <span className="rounded-full bg-accent px-1.5 py-0.5 text-2xs leading-none text-text-inverse">
        {count}
      </span>
    </span>
  );
}

export function FilterBar({
  filters,
  values,
  onChange,
  onClear,
  className,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(values).some((v) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v),
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const currentValue = values[filter.id];

          if (filter.multiple) {
            return (
              <FilterDropdownMultiple
                key={filter.id}
                filter={filter}
                value={Array.isArray(currentValue) ? currentValue : []}
                onChange={(val) => onChange(filter.id, val)}
              />
            );
          }

          return (
            <FilterDropdownSingle
              key={filter.id}
              filter={filter}
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(val) => onChange(filter.id, val)}
            />
          );
        })}

        {hasActiveFilters && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "rounded-button px-2 py-1.5 text-sm text-text-tertiary",
              "hover:text-text hover:bg-surface-hover transition-colors",
            )}
          >
            Clear all
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter) => {
            const currentValue = values[filter.id];
            if (!currentValue) return null;
            return (
              <ActiveFilterBadge
                key={filter.id}
                filter={filter}
                value={currentValue}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
