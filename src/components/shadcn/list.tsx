import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const listVariants = cva("flex flex-col gap-2", {
  variants: {
    spacing: {
      tight: "gap-1",
      normal: "gap-2",
      relaxed: "gap-3",
      loose: "gap-4",
    },
  },
  defaultVariants: {
    spacing: "normal",
  },
});

const listItemVariants = cva(
  "flex items-start gap-2 font-light text-foreground",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const bulletVariants = cva("shrink-0 transition-colors", {
  variants: {
    variant: {
      circle: "rounded-full bg-primary",
      diamond: "bg-primary",
      triangle: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    // Circle sizes
    { variant: "circle", size: "sm", className: "size-1.5 mt-[0.4em]" },
    { variant: "circle", size: "md", className: "size-2 mt-[0.4em]" },
    { variant: "circle", size: "lg", className: "size-2.5 mt-[0.35em]" },
    // Diamond sizes
    { variant: "diamond", size: "sm", className: "size-1.5 mt-[0.4em]" },
    { variant: "diamond", size: "md", className: "size-2 mt-[0.4em]" },
    { variant: "diamond", size: "lg", className: "size-2.5 mt-[0.35em]" },
  ],
  defaultVariants: {
    variant: "circle",
    size: "md",
  },
});

interface ListProps extends React.ComponentProps<"ul"> {
  /**
   * Spacing between list items
   */
  spacing?: VariantProps<typeof listVariants>["spacing"];
  /**
   * Default bullet variant for all items
   */
  bulletVariant?: VariantProps<typeof bulletVariants>["variant"];
  /**
   * Size of the list items
   */
  size?: VariantProps<typeof listItemVariants>["size"];
  /**
   * Use ordered list (ol) instead of unordered (ul)
   */
  ordered?: boolean;
}

interface ListItemProps extends React.ComponentProps<"li"> {
  /**
   * Bullet variant for this specific item (overrides List's bulletVariant)
   */
  bulletVariant?: VariantProps<typeof bulletVariants>["variant"];
  /**
   * Size of the list item (should match parent List size)
   */
  size?: VariantProps<typeof listItemVariants>["size"];
}

const TriangleBullet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    size?: VariantProps<typeof bulletVariants>["size"];
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "size-1.5 mt-[0.4em]",
    md: "size-2 mt-[0.4em]",
    lg: "size-2.5 mt-[0.35em]",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "shrink-0 transition-colors",
        size && sizeClasses[size],
        className
      )}
      {...props}
    >
      <svg
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
      >
        <path
          d="M2 1L7 4L2 7V1Z"
          fill="currentColor"
          className="fill-primary"
        />
      </svg>
    </div>
  );
});
TriangleBullet.displayName = "TriangleBullet";

const ListContext = React.createContext<{
  bulletVariant?: VariantProps<typeof bulletVariants>["variant"];
  size?: VariantProps<typeof listItemVariants>["size"];
}>({});

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      className,
      spacing,
      bulletVariant = "circle",
      size = "md",
      ordered = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = ordered ? "ol" : "ul";

    return (
      <ListContext.Provider value={{ bulletVariant, size }}>
        <Component
          ref={ref as any}
          data-slot="list"
          className={cn(listVariants({ spacing }), className)}
          {...props}
        >
          {children}
        </Component>
      </ListContext.Provider>
    );
  }
);
List.displayName = "List";

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, bulletVariant: itemBulletVariant, size: itemSize, children, ...props }, ref) => {
    const context = React.useContext(ListContext);
    const bulletVariant = itemBulletVariant ?? context.bulletVariant ?? "circle";
    const size = itemSize ?? context.size ?? "md";

    const renderBullet = () => {
      if (bulletVariant === "triangle") {
        return <TriangleBullet size={size} />;
      }

      if (bulletVariant === "diamond") {
        return (
          <div
            className={cn(
              bulletVariants({ variant: "diamond", size }),
              "rotate-45"
            )}
          />
        );
      }

      return <div className={bulletVariants({ variant: "circle", size })} />;
    };

    return (
      <li
        ref={ref}
        data-slot="list-item"
        className={cn(listItemVariants({ size }), className)}
        {...props}
      >
        {renderBullet()}
        <span className="flex-1 leading-relaxed">{children}</span>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export { List, ListItem, listVariants, listItemVariants, bulletVariants };
export type { ListProps, ListItemProps };

