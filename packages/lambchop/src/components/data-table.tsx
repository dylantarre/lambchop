import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnOrderState,
} from "@tanstack/react-table";
import { cn } from "../lib/cn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  loading?: boolean;
  bordered?: boolean;
  hidePagination?: boolean;
  tableFixed?: boolean;
  initialSorting?: SortingState;
  /**
   * Let the viewer reorder columns: drag a header onto another, or focus a
   * header's grip and press Left/Right. Requires every column to have an id
   * (accessor columns get one from their key).
   */
  reorderable?: boolean;
  /** localStorage key that remembers this viewer's column order (per browser). */
  columnOrderKey?: string;
}

function readStoredOrder(key: string | undefined): string[] | null {
  if (!key || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.every((x) => typeof x === "string") ? parsed : null;
  } catch {
    return null;
  }
}

/** Keep a saved order valid as columns change: drop removed ids, append new ones in place. */
function reconcileOrder(saved: string[] | null, ids: string[]): string[] {
  if (!saved) return ids;
  const kept = saved.filter((id) => ids.includes(id));
  for (const [i, id] of ids.entries()) if (!kept.includes(id)) kept.splice(Math.min(i, kept.length), 0, id);
  return kept;
}

export function DataTable<TData>({
  columns,
  data,
  pageSize = 20,
  searchable = false,
  searchPlaceholder = "Search...",
  className,
  loading = false,
  bordered = true,
  hidePagination = false,
  tableFixed = false,
  initialSorting,
  reorderable = false,
  columnOrderKey,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting ?? []);
  const defaultOrder = React.useMemo(
    () => columns.map((c, i) => String(c.id ?? (c as { accessorKey?: string }).accessorKey ?? i)),
    [columns],
  );
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(defaultOrder);
  // Saved order is read after mount so server and client render the same default first.
  React.useEffect(() => {
    if (reorderable) setColumnOrder(reconcileOrder(readStoredOrder(columnOrderKey), defaultOrder));
  }, [reorderable, columnOrderKey, defaultOrder]);
  const [announcement, setAnnouncement] = React.useState("");
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);
  const isCustomOrder = reorderable && columnOrder.join("|") !== defaultOrder.join("|");

  const saveOrder = React.useCallback((next: string[]) => {
    setColumnOrder(next);
    if (!columnOrderKey) return;
    try {
      if (next.join("|") === defaultOrder.join("|")) window.localStorage.removeItem(columnOrderKey);
      else window.localStorage.setItem(columnOrderKey, JSON.stringify(next));
    } catch {
      /* storage unavailable: the order still applies for this visit */
    }
  }, [columnOrderKey, defaultOrder]);

  const moveColumn = React.useCallback((id: string, toIndex: number, label: string) => {
    const from = columnOrder.indexOf(id);
    const to = Math.max(0, Math.min(columnOrder.length - 1, toIndex));
    if (from < 0 || from === to) return;
    const next = [...columnOrder];
    next.splice(from, 1);
    next.splice(to, 0, id);
    saveOrder(next);
    setAnnouncement(`${label} moved to column ${to + 1} of ${next.length}`);
  }, [columnOrder, saveOrder]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Increment generation when loading transitions false → triggers row re-animation
  const [generation, setGeneration] = React.useState(0);
  const prevLoadingRef = React.useRef(loading);
  React.useEffect(() => {
    if (prevLoadingRef.current && !loading) {
      setGeneration((g) => g + 1);
    }
    prevLoadingRef.current = loading;
  }, [loading]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnOrder,
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {reorderable && (
        <span className="sr-only" aria-live="polite">{announcement}</span>
      )}
      {isCustomOrder && (
        <div className="-mb-2 flex justify-end px-3">
          <button
            type="button"
            className="text-xs text-text-secondary underline-offset-2 hover:text-text hover:underline"
            onClick={() => { saveOrder(defaultOrder); setAnnouncement("Columns reset to the default order"); }}
          >
            Reset columns
          </button>
        </div>
      )}
      {searchable && (
        <div className="relative w-full max-w-sm">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className={cn(
              "w-full rounded-button border border-surface-border bg-surface pl-9 pr-8 py-1.5",
              "text-sm text-text placeholder:text-text-muted",
              "outline-none focus:border-accent focus:ring-1 focus:ring-accent",
            )}
          />
          {globalFilter && (
            <button
              type="button"
              onClick={() => setGlobalFilter("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className={cn("relative overflow-auto", bordered && "rounded-card border border-surface-border")}>
        {loading && (
          <div className={cn("absolute inset-0 z-20 flex items-center justify-center bg-surface/50", bordered && "rounded-card")}>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-accent"
                  style={{
                    animation: `lmbchp-dot-bounce 0.7s ease-in-out ${i * 0.13}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <table className={cn("w-full border-collapse text-sm", tableFixed && "table-fixed")}>
          <thead className="sticky top-0 z-10 bg-surface-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();
                  const colId = header.column.id;
                  const headerLabel = typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : colId;

                  return (
                    <th
                      key={header.id}
                      style={tableFixed && header.getSize() >= 999 ? undefined : { width: header.getSize() }}
                      className={cn(
                        "border-b border-surface-border px-3 py-2 text-left font-medium text-text-secondary",
                        canSort && "cursor-pointer select-none",
                        reorderable && "transition-[box-shadow,opacity] duration-fast ease-move",
                        reorderable && dragId === colId && "opacity-50",
                        reorderable && overId === colId && dragId !== colId && "shadow-[inset_2px_0_0_rgb(var(--accent-strong))]",
                      )}
                      draggable={reorderable || undefined}
                      onDragStart={reorderable ? (e) => { setDragId(colId); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", colId); } : undefined}
                      onDragOver={reorderable ? (e) => { if (dragId) { e.preventDefault(); setOverId(colId); } } : undefined}
                      onDragLeave={reorderable ? () => setOverId((o) => (o === colId ? null : o)) : undefined}
                      onDrop={reorderable ? (e) => {
                        e.preventDefault();
                        if (dragId && dragId !== colId) {
                          const dragged = table.getColumn(dragId);
                          const dl = typeof dragged?.columnDef.header === "string" ? dragged.columnDef.header : dragId;
                          moveColumn(dragId, columnOrder.indexOf(colId), dl);
                        }
                        setDragId(null);
                        setOverId(null);
                      } : undefined}
                      onDragEnd={reorderable ? () => { setDragId(null); setOverId(null); } : undefined}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : canSort
                              ? "none"
                              : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {reorderable && (
                          <button
                            type="button"
                            aria-label={`Move ${headerLabel} column. Use left and right arrow keys.`}
                            title="Drag, or focus and use the arrow keys, to move this column"
                            className="-ml-1 cursor-grab rounded-button px-0.5 text-text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
                              e.preventDefault();
                              e.stopPropagation();
                              const grip = e.currentTarget;
                              moveColumn(colId, columnOrder.indexOf(colId) + (e.key === "ArrowLeft" ? -1 : 1), headerLabel);
                              // Keep focus on the moved column's grip.
                              requestAnimationFrame(() => grip.focus());
                            }}
                          >
                            <svg aria-hidden="true" width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
                              <circle cx="2" cy="2" r="1" /><circle cx="6" cy="2" r="1" />
                              <circle cx="2" cy="6" r="1" /><circle cx="6" cy="6" r="1" />
                              <circle cx="2" cy="10" r="1" /><circle cx="6" cy="10" r="1" />
                            </svg>
                          </button>
                        )}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {canSort && (
                          <span className="inline-flex flex-col text-2xs leading-none text-text-muted">
                            <span
                              className={cn(
                                sorted === "asc" && "text-accent",
                              )}
                            >
                              {"\u2191"}
                            </span>
                            <span
                              className={cn(
                                sorted === "desc" && "text-accent",
                              )}
                            >
                              {"\u2193"}
                            </span>
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody
            key={generation}
            className={cn(loading && "opacity-30 pointer-events-none")}
          >
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-text-tertiary"
                >
                  No results.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-surface-border transition-colors hover:bg-surface-hover",
                    index % 2 === 1 && "bg-surface-secondary",
                  )}
                  style={{
                    animationName: "lmbchp-row-in",
                    animationDuration: "260ms",
                    animationTimingFunction: "ease",
                    animationDelay: `${Math.min(index, 24) * 28}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-2 text-text">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!hidePagination && (
        <div className="flex items-center justify-between px-1 text-sm text-text-secondary">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to previous page"
              className={cn(
                "rounded-button border border-surface-border bg-surface px-3 py-1 text-sm",
                "hover:bg-surface-hover",
                "disabled:cursor-not-allowed disabled:text-text-muted disabled:border-surface-border/50",
              )}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Go to next page"
              className={cn(
                "rounded-button border border-surface-border bg-surface px-3 py-1 text-sm",
                "hover:bg-surface-hover",
                "disabled:cursor-not-allowed disabled:text-text-muted disabled:border-surface-border/50",
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
