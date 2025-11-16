import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Input component with glass/backdrop blur effect.
 * Based on Figma Design System - Forms/Input/typeable
 *
 * Features:
 * - Glass effect styling (default for all inputs)
 * - Multiple size variants (sm, md, lg)
 * - Icon support (left/right)
 * - Clearable functionality
 * - Error state
 * - Custom cursor color (guild-green-300)
 */
const inputVariants = cva(
  "flex w-full items-center gap-3 border-2 backdrop-blur-[21px] bg-transparent transition-[border-color,box-shadow] outline-none",
  {
    variants: {
      variant: {
        default: "border-border-default focus-within:border-border-strong",
        error: "border-feedback-error focus-within:border-feedback-error",
      },
      size: {
        sm: "h-10 rounded-lg px-4 py-2 text-lg",
        md: "h-14 rounded-2xl px-4 py-3 text-xl",
        lg: "h-16 rounded-2xl px-4 py-1 text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      error,
      variant,
      size,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || "",
    );
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = currentValue && String(currentValue).length > 0;
    const showClearButton = clearable && hasValue;

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (value === undefined) {
        setInternalValue("");
      }
      if (onClear) {
        onClear();
      }
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    // Get size classes for inner elements
    const iconSizeClass = size === "lg" ? "size-6" : "size-5";
    const fontWeightClass = size === "lg" ? "font-light" : "font-normal";
    const lineHeightClass = size === "lg" ? "leading-[1.3]" : "leading-none";

    // Input classes - glass style is default, white text reflects status
    const inputClasses = cn(
      "min-w-0 flex-1 bg-transparent py-3 outline-none",
      "text-white",
      fontWeightClass,
      lineHeightClass,
      "placeholder:font-light placeholder:text-white/36",
      "selection:bg-primary selection:text-primary-foreground",
      "disabled:pointer-events-none disabled:cursor-not-allowed",
      "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
      error && "text-destructive caret-destructive",
      !error && "caret-guild-green-300",
    );

    return (
      <div
        className={cn(
          inputVariants({ variant: error ? "error" : variant, size }),
          "has-[input:disabled]:pointer-events-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50",
          className,
        )}
      >
        {leftIcon && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center text-fg-subtle",
              iconSizeClass,
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          data-slot="input"
          className={inputClasses}
          {...props}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "flex shrink-0 items-center justify-center text-fg-subtle transition-colors hover:text-fg-base",
              iconSizeClass,
            )}
            tabIndex={-1}
          >
            <X className={iconSizeClass} />
          </button>
        )}
        {rightIcon && !showClearButton && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center text-fg-subtle",
              iconSizeClass,
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
