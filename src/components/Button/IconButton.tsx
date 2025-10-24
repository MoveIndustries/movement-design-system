import { forwardRef } from "react";
import { css } from "styled-system/css";

import { BaseButton, type CommonButtonProps } from "./BaseButton";

export interface IconButtonProps extends CommonButtonProps {
  /** The size of the icon button */
  size?: "sm" | "md" | "lg";
  /** The variant style of the button */
  variant?: "filled" | "outlined" | "text" | "ghost";
  /** The color theme of the button */
  color?:
    | "primary"
    | "secondary"
    | "neutral"
    | "danger"
    | "success"
    | "warning";
  /** The border radius of the button */
  radius?: "sm" | "md" | "lg" | "full";
}

/** A specialized button component designed for icon-only content with various styling options. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = "md",
      variant = "filled",
      color = "primary",
      radius = "md",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: { w: "8", h: "8", p: "2" },
      md: { w: "10", h: "10", p: "2" },
      lg: { w: "12", h: "12", p: "3" },
    };

    const variantStyles = {
      filled: {
        bg: "transparent",
        border: "1px solid",
        borderColor: "transparent",
        "&:hover": {
          bg: "neutrals.blackAlpha.100",
        },
        "&:active": {
          bg: "neutrals.blackAlpha.200",
        },
      },
      outlined: {
        bg: "transparent",
        border: "1px solid",
        borderColor: "neutrals.blackAlpha.300",
        "&:hover": {
          bg: "neutrals.blackAlpha.100",
          borderColor: "neutrals.blackAlpha.400",
        },
        "&:active": {
          bg: "neutrals.blackAlpha.200",
          borderColor: "neutrals.blackAlpha.500",
        },
      },
      text: {
        bg: "transparent",
        border: "1px solid",
        borderColor: "transparent",
        "&:hover": {
          bg: "neutrals.blackAlpha.100",
        },
        "&:active": {
          bg: "neutrals.blackAlpha.200",
        },
      },
      ghost: {
        bg: "transparent",
        border: "1px solid",
        borderColor: "transparent",
        "&:hover": {
          bg: "neutrals.blackAlpha.100",
        },
        "&:active": {
          bg: "neutrals.blackAlpha.200",
        },
      },
    };

    const colorStyles = {
      primary: {
        color: "moveus-marigold.400",
        "&:hover": {
          color: "moveus-marigold.500",
        },
        "&:active": {
          color: "moveus-marigold.600",
        },
      },
      secondary: {
        color: "byzantine-blue.400",
        "&:hover": {
          color: "byzantine-blue.500",
        },
        "&:active": {
          color: "byzantine-blue.600",
        },
      },
      neutral: {
        color: "neutrals.blackAlpha.700",
        "&:hover": {
          color: "neutrals.blackAlpha.800",
        },
        "&:active": {
          color: "neutrals.blackAlpha.900",
        },
      },
      danger: {
        color: "feedback.error.default",
        "&:hover": {
          color: "feedback.error.dark",
        },
        "&:active": {
          color: "feedback.error.dark",
        },
      },
      success: {
        color: "feedback.success.default",
        "&:hover": {
          color: "feedback.success.dark",
        },
        "&:active": {
          color: "feedback.success.dark",
        },
      },
      warning: {
        color: "feedback.warning.default",
        "&:hover": {
          color: "feedback.warning.dark",
        },
        "&:active": {
          color: "feedback.warning.dark",
        },
      },
    };

    const radiusStyles = {
      sm: { borderRadius: "4px" },
      md: { borderRadius: "8px" },
      lg: { borderRadius: "12px" },
      full: { borderRadius: "9999px" },
    };

    const iconButtonStyles = css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      outline: "none",
      _disabled: {
        cursor: "not-allowed",
        opacity: 0.6,
      },
      _focus: {
        outline: "2px solid",
        outlineColor: "byzantine-blue.400",
        outlineOffset: "2px",
      },
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...colorStyles[color],
      ...radiusStyles[radius],
    });

    return (
      <BaseButton
        ref={ref}
        customStyles={iconButtonStyles}
        className={className}
        textTransform="none"
        fontWeight="normal"
        iconSize={size}
        {...props}
      >
        {children}
      </BaseButton>
    );
  }
);
IconButton.displayName = "IconButton";
