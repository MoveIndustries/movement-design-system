import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/shadcn/button";

type PaginationVariant = "default" | "bullets";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  variant?: PaginationVariant;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  variant = "default",
  size = "icon",
  ...props
}: PaginationLinkProps) {
  if (variant === "bullets") {
    return (
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-bullet"
        data-active={isActive}
        className={cn(
          "relative flex size-6 items-center justify-center transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "rounded-full transition-all",
            isActive
              ? "size-2 bg-primary shadow-[0_0_8px_2px] shadow-primary/50"
              : "size-2 bg-muted-foreground/50 hover:bg-muted-foreground"
          )}
        />
      </a>
    );
  }

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

type PaginationNavigationProps = {
  variant?: PaginationVariant;
} & React.ComponentProps<typeof PaginationLink>;

function PaginationPrevious({
  className,
  variant = "default",
  ...props
}: PaginationNavigationProps) {
  if (variant === "bullets") {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go to previous page"
        className={cn("size-6 opacity-50 hover:opacity-100 disabled:opacity-25", className)}
        {...(props as React.ComponentProps<typeof Button>)}
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
    );
  }

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      variant={variant}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  variant = "default",
  ...props
}: PaginationNavigationProps) {
  if (variant === "bullets") {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go to next page"
        className={cn("size-6 opacity-50 hover:opacity-100 disabled:opacity-25", className)}
        {...(props as React.ComponentProps<typeof Button>)}
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    );
  }

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      variant={variant}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

interface BulletPaginationProps extends React.ComponentProps<"nav"> {
  /** Total number of pages */
  totalPages: number;
  /** Current active page (0-indexed) */
  currentPage: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Show navigation arrows */
  showArrows?: boolean;
}

function BulletPagination({
  className,
  totalPages,
  currentPage,
  onPageChange,
  showArrows = true,
  ...props
}: BulletPaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handleBulletClick = (index: number) => {
    onPageChange?.(index);
  };

  return (
    <Pagination className={className} {...props}>
      <PaginationContent className="gap-0">
        {showArrows && (
          <PaginationItem>
            <PaginationPrevious
              variant="bullets"
              onClick={handlePrevious}
              aria-disabled={currentPage === 0}
              className={currentPage === 0 ? "pointer-events-none" : "cursor-pointer"}
            />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }).map((_, index) => {
          const isActive = index === currentPage;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                variant="bullets"
                isActive={isActive}
                onClick={() => handleBulletClick(index)}
                aria-label={`Go to page ${index + 1}`}
                className="cursor-pointer"
              />
            </PaginationItem>
          );
        })}

        {showArrows && (
          <PaginationItem>
            <PaginationNext
              variant="bullets"
              onClick={handleNext}
              aria-disabled={currentPage >= totalPages - 1}
              className={
                currentPage >= totalPages - 1
                  ? "pointer-events-none"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  BulletPagination,
};
export type { PaginationVariant, BulletPaginationProps };
