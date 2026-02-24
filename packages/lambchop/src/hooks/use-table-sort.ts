import { useState, useCallback } from "react";
import type { SortingState } from "@tanstack/react-table";

export function useTableSort(initialSort: SortingState = []) {
  const [sorting, setSorting] = useState<SortingState>(initialSort);

  const toggleSort = useCallback((columnId: string) => {
    setSorting((prev) => {
      const existing = prev.find((s) => s.id === columnId);
      if (!existing) return [{ id: columnId, desc: true }];
      if (existing.desc) return [{ id: columnId, desc: false }];
      return [];
    });
  }, []);

  return { sorting, setSorting, toggleSort };
}
