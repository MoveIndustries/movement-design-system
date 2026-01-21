import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase tracking-wider rounded-full",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        success:
          "bg-success text-success-foreground hover:bg-success/90 active:bg-success/80",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "w-full max-w-[522px] p-3 bg-[#81FFBA] border-0 font-mono text-[#0237FE] rounded-lg text-2xl font-bold leading-6 tracking-[-0.06rem] uppercase relative overflow-hidden backdrop-blur-[21px] shadow-[8px_8px_0_0_#0337FF] hover:-translate-y-px hover:bg-white hover:shadow-[-8px_-8px_0_0_#0337FF] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out",
      },
      size: {
        xs: "h-6 px-3 text-xs gap-1.5",
        sm: "h-8 px-4 text-sm gap-2",
        default: "h-10 px-6 text-base gap-2",
        lg: "h-12 px-8 text-lg gap-2.5",
        xl: "h-14 px-10 text-xl gap-2.5",
        "2xl": "h-16 px-12 text-2xl gap-3",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
