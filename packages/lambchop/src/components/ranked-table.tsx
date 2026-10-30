"use client";

import * as React from "react";
import { cn } from "../lib/cn";
import { formatValue, inferFormat, type ValueFormat } from "../lib/format";

export type CellValue = string | number | null;

export interface RankedTableColumn {
  header: string;
  /** "text" for labels; otherwise a numeric format. Inferred from header + data when omitted. */
  format?: ValueFormat | "text";
}

export interface RankedTableProps {
  columns: (RankedTableColumn | string)[];
  rows: CellValue[][];
  /** Rows shown before "Show more". Default 10. */
  pageSize?: number;
  /** Column index that gets an inline data bar. Default: first currency column, else first numeric. */
  barColumn?: number | null;
  /** Prefix rows with their rank. Default true. */
  showRank?: boolean;
  /** Allow sorting by clicking headers. Default true. */
  sortable?: boolean;
  className?: string;
}

function parseNumeric(v: CellValue): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (!/^[-+]?\$?[\d,]*\.?\d+%?$/.test(t)) return null;
  const n = Number(t.replace(/[$,%]/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function RankedTable({
  columns: rawColumns,
  rows,
  pageSize = 10,
  barColumn,
  showRank = true,
  sortable = true,
  className,
}: RankedTableProps) {
  const columns = React.useMemo(
    () =>
      rawColumns.map((c, ci) => {
        const col: RankedTableColumn = typeof c === "string" ? { header: c } : c;
        if (col.format) return col;
        const numeric =
          rows.length > 0 &&
          rows.every((r) => r[ci] == null || parseNumeric(r[ci]) != null) &&
          rows.some((r) => r[ci] != null);
        if (!numeric) return { ...col, format: "text" as const };
        const anyDollar = rows.some((r) => typeof r[ci] === "string" && String(r[ci]).includes("$"));
        const anyPct = rows.some((r) => typeof r[ci] === "string" && String(r[ci]).includes("%"));
        const fmt: ValueFormat = anyDollar ? "currency" : anyPct ? "percent" : inferFormat(col.header);
        return { ...col, format: fmt === "number" && /year|id\b/i.test(col.header) ? ("text" as const) : fmt };
      }),
    [rawColumns, rows],
  );

  const [sort, setSort] = React.useState<{ index: number; dir: "asc" | "desc" } | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const { index, dir } = sort;
    const numeric = columns[index]?.format !== "text";
    return [...rows].sort((a, b) => {
      const av = numeric ? parseNumeric(a[index]) ?? -Infinity : String(a[index] ?? "");
      const bv = numeric ? parseNumeric(b[index]) ?? -Infinity : String(b[index] ?? "");
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return dir === "asc" ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  const barIdx = React.useMemo(() => {
    if (barColumn === null) return -1;
    if (barColumn != null) return barColumn;
    const cur = columns.findIndex((c) => c.format === "currency");
    return cur >= 0 ? cur : columns.findIndex((c) => c.format !== "text");
  }, [barColumn, columns]);

  const barMax = React.useMemo(() => {
    if (barIdx < 0) return 0;
    return rows.reduce((m, r) => Math.max(m, Math.abs(parseNumeric(r[barIdx]) ?? 0)), 0);
  }, [rows, barIdx]);

  // One decimal policy per currency column so values line up.
  const currencyDigits = React.useMemo(
    () =>
      columns.map((c, ci) =>
        c.format === "currency" &&
        rows.some((r) => {
          const n = parseNumeric(r[ci]);
          return n != null && Math.abs(n) < 100 && !Number.isInteger(n);
        })
          ? 2
          : 0,
      ),
    [columns, rows],
  );

  // Short text columns (author, site) stay on one line; long ones may wrap.
  const shortText = React.useMemo(
    () =>
      columns.map(
        (c, ci) =>
          c.format === "text" &&
          ci > 0 &&
          rows.every((r) => String(r[ci] ?? "").length <= 24),
      ),
    [columns, rows],
  );

  const visible = expanded ? sorted : sorted.slice(0, pageSize);
  const toggleSort = (i: number) => {
    if (!sortable) return;
    setSort((s) =>
      s?.index === i
        ? s.dir === "desc" ? { index: i, dir: "asc" } : null
        : { index: i, dir: columns[i].format === "text" ? "asc" : "desc" },
    );
  };

  const render = (v: CellValue, ci: number) => {
    const col = columns[ci];
    if (v == null || v === "") return <span className="text-text-muted">—</span>;
    if (col.format === "text") return String(v);
    const n = parseNumeric(v);
    return n == null
      ? String(v)
      : formatValue(n, col.format as ValueFormat, col.format === "currency" ? currencyDigits[ci] : undefined);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-surface-border">
              {showRank && <th className="w-10 px-3 py-2 text-left text-xs font-medium text-text-tertiary">#</th>}
              {columns.map((col, i) => {
                const numeric = col.format !== "text";
                const active = sort?.index === i;
                return (
                  <th
                    key={i}
                    scope="col"
                    aria-sort={active ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined}
                    className={cn(
                      "whitespace-nowrap px-3 py-2 text-xs font-medium uppercase tracking-wider text-text-tertiary",
                      numeric ? "text-right" : "text-left",
                    )}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(i)}
                        className={cn(
                          "inline-flex items-center gap-1 uppercase tracking-wider hover:text-text",
                          active && "text-text",
                        )}
                      >
                        {col.header}
                        <span aria-hidden className={cn("text-[10px]", !active && "opacity-0")}>
                          {active && sort!.dir === "asc" ? "▲" : "▼"}
                        </span>
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, ri) => (
              <tr key={ri} className="border-b border-surface-border/60 transition-colors last:border-b-0 hover:bg-surface-hover/60">
                {showRank && <td className="px-3 py-2.5 align-top text-xs tabular-nums text-text-tertiary">{ri + 1}</td>}
                {columns.map((col, ci) => {
                  const numeric = col.format !== "text";
                  const n = ci === barIdx ? parseNumeric(row[ci]) : null;
                  return (
                    <td
                      key={ci}
                      className={cn(
                        "px-3 py-2.5 align-top",
                        numeric ? "whitespace-nowrap text-right tabular-nums text-text" : "text-text",
                        ci === 0 && !numeric && "min-w-[14rem] font-medium",
                        ci > 0 && !numeric && "text-text-secondary",
                        shortText[ci] && "whitespace-nowrap",
                      )}
                    >
                      {ci === 0 && !numeric ? (
                        <span className="line-clamp-2" title={String(row[ci] ?? "")}>{render(row[ci], ci)}</span>
                      ) : ci === barIdx && n != null && barMax > 0 ? (
                        <span className="inline-flex flex-col items-end gap-1">
                          {render(row[ci], ci)}
                          <span className="block h-1 w-16 overflow-hidden rounded-full bg-surface-tertiary">
                            <span className="block h-full rounded-full bg-accent" style={{ width: `${(Math.abs(n) / barMax) * 100}%` }} />
                          </span>
                        </span>
                      ) : (
                        render(row[ci], ci)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > pageSize && (
        <div className="flex items-center justify-between border-t border-surface-border px-3 pt-2.5 text-xs text-text-tertiary">
          <span>
            Showing {visible.length} of {rows.length}
          </span>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="font-medium text-text-secondary hover:text-text"
          >
            {expanded ? "Show less" : `Show all ${rows.length}`}
          </button>
        </div>
      )}
    </div>
  );
}
