import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { gradientBorderClasses } from "@/lib/border-styles";

const avatarVariants = cva(
  "relative flex size-8 shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      border: {
        none: "",
        glow: gradientBorderClasses.glow,
        guild: "border-2 border-[#81FFBA]",
        byzantine: "border-2 border-[#0337FF]",
      },
    },
    defaultVariants: {
      border: "none",
    },
  },
);

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, border, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ border }), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-semantic-alt-1 text-fg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
