import { ark } from "@ark-ui/react/factory";
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { cx, cva, type RecipeVariantProps } from "styled-system/css";

export type CardVariant = NonNullable<
  RecipeVariantProps<typeof cardStyles>
>["variant"];

export interface CardProps extends ComponentPropsWithoutRef<typeof ark.div> {
  /** The style variant of the card. */
  variant?: CardVariant;
  /** Whether to render as the child element instead of as a `div` */
  asChild?: boolean;
  /** Class name for applying additional styles to the card */
  className?: string;
  /** Children to be rendered inside the card */
  children: ReactNode;
  /** Whether to enable hover effects */
  hoverEffect?: boolean;
}

/** A simple wrapper component that renders its children inside a card. */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      asChild,
      children,
      className,
      hoverEffect = false,
      ...props
    },
    ref
  ) => {
    return (
      <ark.div
        ref={ref}
        asChild={asChild}
        className={cx(cardStyles({ variant, hoverEffect }), className)}
        {...props}
      >
        {children}
      </ark.div>
    );
  }
);
Card.displayName = "Card";

const cardStyles = cva({
  base: {
    position: "relative",
    border: "none",
    backgroundOrigin: "border-box",
    // backgroundClip: "content-box, border-box",
    transition: "0.3s ease-out",
    boxSizing: "border-box",
    borderRadius: "4px",

    // Glass morphism base styles
    background:
      "linear-gradient(153deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%)",
    backdropFilter: "blur(21px)",

    // Pseudo-element for border effect
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "0",
      borderRadius: "4px",
      padding: "1px",
      background:
        "radial-gradient(59.92% 76.24% at 50% 50%, #81FFBA 0%, rgba(129, 255, 186, 0.00) 100%), radial-gradient(59.97% 79.12% at 50% 50%, #81FFBA 18.75%, rgba(129, 255, 186, 0.00) 100%), radial-gradient(76.68% 94.29% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
      mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      maskComposite: "exclude",
      pointerEvents: "none",
    },
  },
  variants: {
    variant: {
      default: {
        p: "6",
      },
      condensed: {
        p: "3",
      },
    },
    hoverEffect: {
      true: {
        cursor: "pointer",
        _hover: {
          background:
            "linear-gradient(153deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)",
          backdropFilter: "blur(21px)",
          "&::before": {
            background:
              "radial-gradient(59.92% 76.24% at 50% 50%, #FFD935 0%, rgba(21, 21, 21, 0.00) 100%), radial-gradient(59.97% 79.12% at 50% 50%, #FFD935 18.75%, rgba(255, 217, 53, 0.00) 100%), radial-gradient(76.68% 94.29% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "default",
    hoverEffect: false,
  },
});
