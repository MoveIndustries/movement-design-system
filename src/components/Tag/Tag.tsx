import { ReactNode, forwardRef } from "react";
import { cx, cva } from "styled-system/css";

import { type TagVariant, type TagColor, type TagSize } from "./types";

// Mock icon components for tag
const IconStar = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

export interface TagProps {
  /** The content of the tag */
  children: ReactNode;
  /** The visual variant of the tag */
  variant?: TagVariant;
  /** The color scheme of the tag */
  color?: TagColor;
  /** The size of the tag */
  size?: TagSize;
  /** Whether the tag has an icon */
  hasIcon?: boolean;
  /** Whether the tag can be dismissed */
  isDismissible?: boolean;
  /** Callback when the tag is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
}

// Tag recipe using CVA
const tagRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2",
    borderRadius: "primary",
    fontFamily: "body",
    fontWeight: "400",
    lineHeight: "1",
    cursor: "default",
    transition: "all 0.2s ease",
  },
  variants: {
    variant: {
      outline: {
        border: "1px solid",
        bg: "transparent",
      },
      solid: {
        border: "1px solid",
        bg: "currentColor",
      },
    },
    color: {
      yellow: {
        color: "primary.base",
        borderColor: "primary.base",
      },
      blue: {
        color: "blue.500",
        borderColor: "blue.500",
      },
      pink: {
        color: "pink.500",
        borderColor: "pink.500",
      },
      red: {
        color: "red.500",
        borderColor: "red.500",
      },
      green: {
        color: "green.500",
        borderColor: "green.500",
      },
    },
    size: {
      sm: {
        px: "2",
        py: "1",
        fontSize: "xs",
        gap: "1",
      },
      md: {
        px: "3",
        py: "1.5",
        fontSize: "sm",
        gap: "2",
      },
      lg: {
        px: "4",
        py: "2",
        fontSize: "md",
        gap: "2",
      },
      xl: {
        px: "5",
        py: "2.5",
        fontSize: "lg",
        gap: "3",
      },
    },
  },
  compoundVariants: [
    // Solid variant with different text colors
    {
      variant: "solid",
      color: "yellow",
      css: {
        color: "black",
        borderColor: "black",
      },
    },
    {
      variant: "solid",
      color: "blue",
      css: {
        color: "white",
        borderColor: "black",
      },
    },
    {
      variant: "solid",
      color: "pink",
      css: {
        color: "white",
        borderColor: "black",
      },
    },
    {
      variant: "solid",
      color: "red",
      css: {
        color: "white",
        borderColor: "black",
      },
    },
    {
      variant: "solid",
      color: "green",
      css: {
        color: "white",
        borderColor: "black",
      },
    },
  ],
  defaultVariants: {
    variant: "outline",
    color: "yellow",
    size: "md",
  },
});

// Tag icon recipe using CVA
const tagIconRecipe = cva({
  base: {
    flexShrink: "0",
  },
  variants: {
    variant: {
      outline: {},
      solid: {},
    },
    color: {
      yellow: {},
      blue: {},
      pink: {},
      red: {},
      green: {},
    },
    size: {
      sm: { w: "3", h: "3" },
      md: { w: "4", h: "4" },
      lg: { w: "5", h: "5" },
      xl: { w: "6", h: "6" },
    },
  },
  compoundVariants: [
    // Solid variant with different icon colors
    {
      variant: "solid",
      color: "yellow",
      css: { color: "black" },
    },
    {
      variant: "solid",
      color: "blue",
      css: { color: "white" },
    },
    {
      variant: "solid",
      color: "pink",
      css: { color: "white" },
    },
    {
      variant: "solid",
      color: "red",
      css: { color: "white" },
    },
    {
      variant: "solid",
      color: "green",
      css: { color: "white" },
    },
  ],
  defaultVariants: {
    variant: "outline",
    color: "yellow",
    size: "md",
  },
});

// Tag close button recipe using CVA
const tagCloseRecipe = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "sm",
    transition: "all 0.2s ease",
    _hover: {
      bg: "currentColor",
      opacity: "0.1",
    },
  },
  variants: {
    variant: {
      outline: {},
      solid: {},
    },
    color: {
      yellow: {},
      blue: {},
      pink: {},
      red: {},
      green: {},
    },
    size: {
      sm: { w: "3", h: "3" },
      md: { w: "4", h: "4" },
      lg: { w: "5", h: "5" },
      xl: { w: "6", h: "6" },
    },
  },
  compoundVariants: [
    // Solid variant with different close button colors
    {
      variant: "solid",
      color: "yellow",
      css: { color: "black" },
    },
    {
      variant: "solid",
      color: "blue",
      css: { color: "white" },
    },
    {
      variant: "solid",
      color: "pink",
      css: { color: "white" },
    },
    {
      variant: "solid",
      color: "red",
      css: { color: "white" },
    },
    {
      variant: "solid",
      color: "green",
      css: { color: "white" },
    },
  ],
  defaultVariants: {
    variant: "outline",
    color: "yellow",
    size: "md",
  },
});

/** A tag component for displaying labels or categories */
export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      variant = "outline",
      color = "yellow",
      size = "md",
      hasIcon = false,
      isDismissible = false,
      onDismiss,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(tagRecipe({ variant, color, size }), className)}
      >
        {hasIcon && (
          <IconStar className={tagIconRecipe({ variant, color, size })} />
        )}
        <span>{children}</span>
        {isDismissible && (
          <button
            type="button"
            className={tagCloseRecipe({ variant, color, size })}
            onClick={onDismiss}
            aria-label="Remove tag"
          >
            <IconX />
          </button>
        )}
      </div>
    );
  }
);
Tag.displayName = "Tag";
