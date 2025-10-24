"use client";

import { ComponentType, forwardRef, useState } from "react";
import { css, cx } from "styled-system/css";

import { useDebounce } from "../../hooks";

type InputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "color" | "height" | "width" | "size"
>;

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success";

export interface InputProps extends InputAttributes {
  /** The size of the input */
  size?: InputSize;
  /** The validation state of the input */
  state?: InputState;
  /** An icon component to be positioned to the left of the input text (e.g. a search icon) */
  LeadIcon?: ComponentType<{ className?: string }>;
  /** An icon component to be positioned to the right of the input text (e.g. a search icon) */
  TailIcon?: ComponentType<{ className?: string }>;
  /** Class name for applying additional styles to the input's wrapper element */
  className?: string;
}

/**
 * An element for accepting text-based input from the user.
 * It accepts all the attributes that an `input` element does (except color, height, and width).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      state = "default",
      LeadIcon,
      TailIcon,
      className,
      onMouseDown,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);

    // Ever so slightly debounce the keyboard focus flag to prevent the focus ring from flashing
    // during the single render between the focus handler and mouse down handler's completion
    const debouncedIsKeyboardFocus = useDebounce(isKeyboardFocus, 10);

    return (
      <div
        className={cx(
          getInputWrapperStyles(size, state),
          debouncedIsKeyboardFocus && getFocusRingStyles(),
          className
        )}
      >
        {!!LeadIcon && <LeadIcon className={getIconStyles(size)} />}
        <input
          ref={ref}
          onMouseDown={(e) => {
            // Wait until next tick to set keyboard focus to false to prevent a race condition with
            // the focus handler that initially sets it to true
            window.setTimeout(() => setIsKeyboardFocus(false), 0);
            onMouseDown?.(e);
          }}
          onFocus={(e) => {
            // Assume the focus was initiated by a keyboard until a mouse down handler proves it false
            setIsKeyboardFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsKeyboardFocus(false);
            onBlur?.(e);
          }}
          className={getInputStyles()}
          {...props}
        />
        {!!TailIcon && <TailIcon className={getIconStyles(size)} />}
      </div>
    );
  }
);
Input.displayName = "Input";

// Helper functions for styling
const getInputWrapperStyles = (size: InputSize, state: InputState) => {
  const baseStyles = css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "3",
    borderRadius: "lg",
    backdropFilter: "blur(21px)",
    transition: "all 0.2s ease-in-out",
    overflow: "hidden",
    _focusWithin: {
      borderColor: "guild-green.300",
    },
  });

  const sizeStyles = {
    sm: css({
      px: "3",
      py: "2",
      minH: "10",
      fontSize: "lg",
    }),
    md: css({
      px: "4",
      py: "3",
      minH: "12",
      fontSize: "2xl",
    }),
    lg: css({
      px: "5",
      py: "4",
      minH: "56",
      fontSize: "2xl",
    }),
  };

  const stateStyles = {
    default: css({
      bg: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(129, 255, 186, 0.3)",
      _hover: {
        borderColor: "rgba(129, 255, 186, 0.5)",
      },
    }),
    error: css({
      bg: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(216, 44, 45, 0.5)",
      _hover: {
        borderColor: "rgba(216, 44, 45, 0.7)",
      },
      _focusWithin: {
        borderColor: "rgba(216, 44, 45, 0.8)",
      },
    }),
    success: css({
      bg: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(129, 255, 186, 0.5)",
      _hover: {
        borderColor: "rgba(129, 255, 186, 0.7)",
      },
      _focusWithin: {
        borderColor: "rgba(129, 255, 186, 0.8)",
      },
    }),
  };

  return cx(baseStyles, sizeStyles[size], stateStyles[state]);
};

const getInputStyles = () => {
  return css({
    flex: "1",
    border: "none",
    outline: "none",
    bg: "transparent",
    color: "neutrals.white",
    fontFamily: "body",
    fontWeight: "regular",
    lineHeight: "1.3",
    _placeholder: {
      color: "rgba(255, 255, 255, 0.36)",
    },
    _disabled: {
      color: "rgba(255, 255, 255, 0.2)",
      cursor: "not-allowed",
    },
  });
};

const getIconStyles = (size: InputSize) => {
  const sizeMap = {
    sm: css({ h: "5", w: "5" }),
    md: css({ h: "6", w: "6" }),
    lg: css({ h: "7", w: "7" }),
  };

  return cx(
    css({
      color: "rgba(255, 255, 255, 0.6)",
      flexShrink: "0",
    }),
    sizeMap[size]
  );
};

const getFocusRingStyles = () => {
  return css({
    borderColor: "rgba(129, 255, 186, 0.8)",
    boxShadow: "0 0 0 2px rgba(129, 255, 186, 0.2)",
  });
};
