import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  TableContext,
  type SortDirection,
  type SortFunction,
} from "./table-hooks";

type TableVariant = "simple" | "borders" | "alternating";

interface TableProps extends React.ComponentProps<"table"> {
  variant?: TableVariant;
  defaultSortFn?: SortFunction;
  mobileCardRender?: <T>(item: T, index: number) => React.ReactNode;
  mobileData?: unknown[];
  forceMobile?: boolean;
}

function Table({
  className,
  variant = "simple",
  defaultSortFn,
  mobileCardRender,
  mobileData,
  forceMobile,
  children,
  ...props
}: TableProps) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const columnSortFnsRef = React.useRef<Record<string, SortFunction>>({});
  const isMobile = useIsMobile();
  const shouldShowMobile = forceMobile || (isMobile && mobileCardRender && mobileData);

  const handleSort = React.useCallback(
    (column: string) => {
      if (sortColumn === column) {
        // Cycle through: asc -> desc -> null (unsorted)
        if (sortDirection === "asc") {
          setSortDirection("desc");
        } else if (sortDirection === "desc") {
          setSortDirection(null);
          setSortColumn(null);
        } else {
          setSortDirection("asc");
        }
      } else {
        // New column, start with ascending
        setSortColumn(column);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection],
  );

  const registerColumnSortFn = React.useCallback(
    (column: string, sortFn: SortFunction) => {
      columnSortFnsRef.current[column] = sortFn;
    },
    [],
  );

  const contextValue = React.useMemo(
    () => ({
      variant,
      sortColumn,
      sortDirection,
      onSort: handleSort,
      defaultSortFn,
      columnSortFns: columnSortFnsRef.current,
      registerColumnSortFn,
    }),
    [
      variant,
      sortColumn,
      sortDirection,
      handleSort,
      defaultSortFn,
      registerColumnSortFn,
    ],
  );

  return (
    <TableContext.Provider value={contextValue}>
      {shouldShowMobile ? (
        <div
          data-slot="table-mobile-container"
          className={cn(
            "relative w-full",
            "flex flex-col gap-3",
            className,
          )}
        >
          {mobileData?.map((item, index) => (
            <div key={index}>
              {mobileCardRender?.(item, index)}
            </div>
          ))}
        </div>
      ) : (
        <div
          data-slot="table-container"
          className={cn(
            "relative w-full overflow-x-auto",
            "rounded-base border border-border-default p-4",
            className,
          )}
        >
          <table data-slot="table" className="w-full caption-bottom" {...props}>
            {children}
          </table>
        </div>
      )}
    </TableContext.Provider>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-semantic-alt-1/50 border-t border-border-default font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const { variant } = React.useContext(TableContext);

  return (
    <tr
      data-slot="table-row"
      className={cn(
        "h-12",
        variant !== "alternating" && "transition-colors",
        variant === "borders" &&
          "[&>td]:border-b [&>td]:border-[rgba(255,255,255,0.24)] last:[&>td]:border-b-0",
        variant === "alternating" && "even:bg-[rgba(255,255,255,0.16)]",
        className,
      )}
      {...props}
    />
  );
}

interface TableHeadProps extends React.ComponentProps<"th"> {
  sortKey?: string;
  sortable?: boolean;
  sortFn?: SortFunction;
}

function TableHead({
  className,
  sortKey,
  sortable = !!sortKey,
  sortFn,
  children,
  ...props
}: TableHeadProps) {
  const { sortColumn, sortDirection, onSort, registerColumnSortFn } =
    React.useContext(TableContext);

  // Register column-specific sort function
  React.useEffect(() => {
    if (sortKey && sortFn && registerColumnSortFn) {
      registerColumnSortFn(sortKey, sortFn);
    }
  }, [sortKey, sortFn, registerColumnSortFn]);

  const isSorted = sortKey && sortColumn === sortKey;
  const showSortIcon = sortable && sortKey;

  const handleClick = () => {
    if (sortable && sortKey) {
      onSort(sortKey);
    }
  };

  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-12 px-4 text-left align-middle",
        "text-xs leading-[1.3] font-bold tracking-[1.2px] uppercase",
        "text-[rgba(255,255,255,0.64)]",
        "whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        sortable &&
          "cursor-pointer transition-colors select-none hover:text-white",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {showSortIcon ? (
        <div className="flex items-center gap-1">
          {children}
          {isSorted && sortDirection === "asc" && (
            <ChevronUp className="h-4 w-4 text-white" />
          )}
          {isSorted && sortDirection === "desc" && (
            <ChevronDown className="h-4 w-4 text-white" />
          )}
          {(!isSorted || sortDirection === null) && (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </div>
      ) : (
        children
      )}
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "h-12 px-4 align-middle",
        "text-sm leading-[1.4] font-normal",
        "text-white",
        "whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
export type { TableVariant };
