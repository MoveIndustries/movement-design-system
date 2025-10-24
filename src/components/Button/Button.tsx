import { forwardRef } from "react";
import { cx, type RecipeVariantProps } from "styled-system/css";

import { buttonStyles } from "./button.styles";
import { BaseButton, type CommonButtonProps } from "./BaseButton";

export type ButtonVariants = NonNullable<
  RecipeVariantProps<typeof buttonStyles>
>;

export interface ButtonProps extends CommonButtonProps {
  /** The style variant of the button */
  variant?: ButtonVariants["variant"];
  /** The color theme of the button */
  color?: ButtonVariants["color"];
  /** The size of the button */
  size?: ButtonVariants["size"];
  /** The border radius of the button */
  radius?: ButtonVariants["radius"];
}

/** An interactive button component with comprehensive styling options. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      color = "yellow",
      size = "md",
      radius = "md",
      gap = size === "sm" ? "8" : "12",
      iconSize = size,
      ...props
    },
    ref
  ) => {
    const buttonCustomStyles = buttonStyles({ variant, color, size, radius });

    return (
      <BaseButton
        ref={ref}
        customStyles={buttonCustomStyles}
        gap={gap}
        iconSize={iconSize}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
