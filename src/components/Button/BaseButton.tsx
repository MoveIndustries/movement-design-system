import { ark } from "@ark-ui/react/factory";
import {
  ComponentPropsWithoutRef,
  ComponentType,
  forwardRef,
  JSX,
  ReactNode,
} from "react";
import { css, cx } from "styled-system/css";

import { iconStyles } from "./button.styles";

export type BaseButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ark.button>,
  "asChild" | "aria-label"
>;

export interface CommonButtonProps extends BaseButtonProps {
  /** The button's label. */
  children: ReactNode;
  /** When `true`, the button will fill the width of its parent. */
  fullWidth?: boolean;
  /** An icon component to be positioned to the left of the button label. */
  LeadIcon?: ComponentType<{ className?: string }>;
  /** An icon component to be positioned to the right of the button label. */
  TailIcon?: ComponentType<{ className?: string }>;
  /** When true, the button will be disabled. */
  disabled?: boolean;
  /**
   * An aria-label to override the label passed via the `children` prop.
   * Useful for situations where `children` is not a string
   */
  ariaLabel?: string;
  /**
   * A function that allows you to replace the default `button` element with another HTML element
   * or custom component. Useful for rendering a link that looks like a button.
   */
  render?: (children: ReactNode) => JSX.Element;
  /** Custom CSS styles to apply to the button */
  customStyles?: any;
  /** Additional CSS classes */
  className?: string;
  /** Gap between icon and text */
  gap?: "8" | "12";
  /** Text transform style */
  textTransform?: "uppercase" | "none";
  /** Font weight */
  fontWeight?: "normal" | "medium" | "bold";
  /** Icon size for LeadIcon and TailIcon */
  iconSize?: "sm" | "md" | "lg";
}

/** Base button component with common functionality shared across button variants */
export const BaseButton = forwardRef<HTMLButtonElement, CommonButtonProps>(
  (
    {
      fullWidth = false,
      LeadIcon,
      TailIcon,
      disabled,
      ariaLabel,
      children,
      render,
      customStyles,
      className,
      gap = "12",
      textTransform = "uppercase",
      fontWeight = "medium",
      iconSize = "md",
      ...props
    },
    ref
  ) => {
    const resolvedAriaLabel =
      ariaLabel || (typeof children === "string" ? children : undefined);

    const childrenToRender = (
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap,
          h: "full",
          textTransform,
          fontWeight,
        })}
      >
        {LeadIcon && <LeadIcon className={iconStyles({ size: iconSize })} />}
        <span>{children}</span>
        {TailIcon && <TailIcon className={iconStyles({ size: iconSize })} />}
      </div>
    );

    return (
      <ark.button
        ref={ref}
        disabled={disabled}
        aria-label={resolvedAriaLabel}
        className={cx(customStyles, fullWidth && css({ w: "full" }), className)}
        asChild={!!render}
        {...props}
      >
        {render ? render(childrenToRender) : childrenToRender}
      </ark.button>
    );
  }
);
BaseButton.displayName = "BaseButton";
