import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  gradientBorderClasses,
  glassBackgroundClasses,
} from "@/lib/border-styles";

const cardVariants = cva(
  "text-card-foreground rounded-xl py-4 md:py-6 shadow-sm relative",
  {
    variants: {
      variant: {
        default: cn(glassBackgroundClasses.dark),
        glow: "backdrop-blur-[21px] border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const cardInnerVariants = cva("", {
  variants: {
    variant: {
      default: "",
      glow: gradientBorderClasses.glow,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, children, ...props }: CardProps) {
  const isGlow = variant === "glow";
  const isDefault = !variant || variant === "default";

  return (
    /* Outer container: provides background, border, shadow, and padding */
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant }),
        "flex flex-col gap-4 md:gap-6",
        (isGlow || isDefault) && "relative z-10",
        className,
      )}
      {...props}
    >
      {/* Glow variant: absolutely positioned gradient border effect layer */}
      {isGlow && (
        <div
          className={cn(
            "absolute inset-0 rounded-[inherit] pointer-events-none",
            cardInnerVariants({ variant }),
          )}
        />
      )}
      {/* Inner wrapper: controls spacing between card sections (Header/Content/Footer) */}
      {children}
      {/* <div className={cn()}>{children}</div> */}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] md:gap-3 md:px-6 [.border-b]:pb-4 [.border-b]:md:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-fg-muted text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 md:px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-4 md:gap-3 md:px-6 [.border-t]:pt-4 [.border-t]:md:pt-6",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
export type { CardProps };
