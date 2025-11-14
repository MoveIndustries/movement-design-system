import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl font-heading",
      h2: "scroll-m-20 text-3xl font-bold tracking-tight font-heading",
      h3: "scroll-m-20 text-2xl font-bold tracking-tight font-heading",
      h4: "scroll-m-20 text-xl font-bold tracking-tight font-heading",
      h5: "scroll-m-20 text-lg font-bold tracking-tight font-heading",
      h6: "scroll-m-20 text-base font-bold tracking-tight font-heading",
      p: "leading-7 font-body",
      lead: "text-xl text-muted-foreground font-body",
      large: "text-lg font-semibold font-body",
      small: "text-sm font-medium leading-none font-body",
      muted: "text-sm text-muted-foreground font-body",
      blockquote: "mt-6 border-l-2 pl-6 italic font-body",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      list: "my-6 ml-6 list-disc [&>li]:mt-2 font-body",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      label:
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-body",
      mono: "font-mono",
      uppercase: "uppercase tracking-wider font-body font-bold",
    },
    affects: {
      default: "",
      removePMargin: "[&:not(:first-child)]:mt-6",
      removeMargin: "m-0",
    },
  },
  defaultVariants: {
    variant: "p",
    affects: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  htmlFor?: string;
}

const getDefaultElement = (
  variant: VariantProps<typeof typographyVariants>["variant"],
): React.ElementType => {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "blockquote":
      return "blockquote";
    case "code":
    case "inlineCode":
      return "code";
    case "list":
      return "ul";
    case "label":
      return "label";
    default:
      return "p";
  }
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, affects, as, ...props }, ref) => {
    const Comp = as || getDefaultElement(variant);
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

// Shorthand alias
const Text = Typography;
Text.displayName = "Text";

export { Typography, Text, typographyVariants };
