import * as React from "react";

type SortDirection = "asc" | "desc" | null;

interface TableContextValue {
  variant: "simple" | "borders" | "alternating";
  sortColumn: string | null;
  sortDirection: SortDirection;
  onSort: (column: string) => void;
}

export const TableContext = React.createContext<TableContextValue>({
  variant: "simple",
  sortColumn: null,
  sortDirection: null,
  onSort: () => {},
});

// Hook to get table sorting state
export function useTableSort() {
  const { sortColumn, sortDirection } = React.useContext(TableContext);
  return { sortColumn, sortDirection };
}

// Hook to sort data based on table's current sort state
export function useSortableData<T>(
  data: T[],
  sortFn?: (a: T, b: T, column: string, direction: SortDirection) => number,
) {
  const { sortColumn, sortDirection } = useTableSort();

  return React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const sorted = [...data].sort((a, b) => {
      // Use custom sort function if provided
      if (sortFn) {
        return sortFn(a, b, sortColumn, sortDirection);
      }

      // Default sorting logic - access property by key
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [data, sortColumn, sortDirection, sortFn]);
}

export type { SortDirection };
