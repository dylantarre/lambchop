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
}

export function DataTable<TData>({
  columns,
  data,
  pageSize = 20,
  searchable = false,
  searchPlaceholder = "Search...",
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
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
      {searchable && (
        <div className="flex items-center">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className={cn(
              "w-full max-w-sm rounded-button border border-surface-border bg-surface px-3 py-1.5",
              "text-sm text-text placeholder:text-text-muted",
              "outline-none focus:border-accent focus:ring-1 focus:ring-accent",
            )}
          />
        </div>
      )}

      <div className="overflow-auto rounded-card border border-surface-border">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-surface-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "border-b border-surface-border px-3 py-2 text-left font-medium text-text-secondary",
                        canSort && "cursor-pointer select-none",
                      )}
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
          <tbody>
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
    </div>
  );
}
