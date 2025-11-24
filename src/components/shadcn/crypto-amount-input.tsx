import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { gradientBorderClasses } from "@/lib/border-styles";

/**
 * CryptoAmountInput component - specialized input for crypto amounts
 * Based on Figma Design System - Delegated Staking Amount Input
 *
 * Features:
 * - Large numeric input with mono font
 * - MAX button for setting maximum value
 * - Balance display with wallet icon and token symbol
 * - Error state with insufficient balance badge
 * - Glass effect styling with gradient border
 * - Responsive sizing for mobile and desktop
 */

const cryptoAmountInputVariants = cva(
  "relative w-full md:w-[522px] h-[7.5rem] md:h-[8.5rem] rounded-xl md:rounded-2xl overflow-visible",
  {
    variants: {
      state: {
        default: "",
        filled: "",
        error: "",
        disabled: "opacity-50 mix-blend-luminosity pointer-events-none",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

const containerVariants = cva(
  "absolute inset-0 backdrop-blur-[21px] rounded-[inherit] flex flex-col justify-center items-end px-6 py-4",
  {
    variants: {
      state: {
        default: gradientBorderClasses.glow,
        filled: gradientBorderClasses.glow,
        error: gradientBorderClasses.error,
        disabled: gradientBorderClasses.glow,
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

const inputVariants = cva(
  "w-full bg-transparent border-none outline-none text-[2rem] md:text-5xl font-mono font-normal uppercase tracking-[0.02em] text-left placeholder:text-white/36 placeholder:text-left disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default:
          "text-white caret-guild-green-300 leading-[1.4] md:leading-[1.3]",
        filled:
          "text-white caret-guild-green-300 leading-[1.4] md:leading-[1.3]",
        error:
          "text-destructive caret-destructive leading-[1.4] md:leading-[1.3]",
        disabled: "text-white/50 leading-[1.4] md:leading-[1.3]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

const maxButtonVariants = cva(
  "flex items-center justify-center px-3 py-2 h-8 rounded border transition-all font-bold text-sm uppercase tracking-[0.05em] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed leading-none",
  {
    variants: {
      state: {
        default:
          "border-guild-green-300 text-guild-green-400 hover:bg-guild-green-300 hover:text-byzantine-blue-400",
        filled:
          "border-guild-green-300 text-guild-green-400 hover:bg-guild-green-300 hover:text-byzantine-blue-400",
        error:
          "border-destructive text-destructive hover:bg-destructive hover:text-white",
        disabled: "border-guild-green-300 text-guild-green-300",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

const balanceTextVariants = cva(
  "text-sm md:text-base font-normal leading-tight opacity-50",
  {
    variants: {
      state: {
        default: "text-white",
        filled: "text-white",
        error: "text-destructive",
        disabled: "text-white",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

interface CryptoAmountInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "onChange">,
    VariantProps<typeof cryptoAmountInputVariants> {
  value?: string;
  onChange?: (value: string) => void;
  balance?: string;
  token?: string;
  onMaxClick?: () => void;
  error?: boolean;
  errorMessage?: string;
  state?: "default" | "filled" | "error" | "disabled";
}

// Wallet icon component
const WalletIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M17.5 6.66669V5.83335C17.5 4.45264 16.3807 3.33335 15 3.33335H4.16667C2.78595 3.33335 1.66667 4.45264 1.66667 5.83335V14.1667C1.66667 15.5474 2.78595 16.6667 4.16667 16.6667H15C16.3807 16.6667 17.5 15.5474 17.5 14.1667V13.3334M17.5 6.66669C18.1903 6.66669 18.75 7.22636 18.75 7.91669V11.0834C18.75 11.7737 18.1903 12.3334 17.5 12.3334M17.5 6.66669C16.8097 6.66669 16.25 7.22636 16.25 7.91669V11.0834C16.25 11.7737 16.8097 12.3334 17.5 12.3334"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

WalletIcon.displayName = "WalletIcon";

const CryptoAmountInput = React.forwardRef<
  HTMLInputElement,
  CryptoAmountInputProps
>(
  (
    {
      className,
      value,
      onChange,
      balance = "0",
      token = "MOVE",
      onMaxClick,
      error = false,
      errorMessage = "Insufficient balance",
      state: stateProp,
      disabled = false,
      placeholder = "0",
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Determine state
    const getState = (): "default" | "filled" | "error" | "disabled" => {
      if (disabled) return "disabled";
      if (error) return "error";
      if (value && value !== "0" && value !== "") return "filled";
      return "default";
    };

    const currentState = stateProp || getState();

    // Handle input changes - only allow valid decimal numbers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Allow empty string
      if (newValue === "") {
        onChange?.(newValue);
        return;
      }

      // Allow only numbers and one decimal point
      const regex = /^\d*\.?\d*$/;
      if (regex.test(newValue)) {
        onChange?.(newValue);
      }
    };

    // Handle focus - clear if 0
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "0") {
        onChange?.("");
      }
      props.onFocus?.(e);
    };

    // Prevent mouse wheel from changing value
    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      e.currentTarget.blur();
    };

    return (
      <div
        className={cn(
          cryptoAmountInputVariants({ state: currentState }),
          className,
        )}
      >
        <div className={containerVariants({ state: currentState })}>
          {/* Input and MAX button row */}
          <div className="flex w-full flex-1 items-center justify-between gap-4">
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={value}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onWheel={handleWheel}
              placeholder={placeholder}
              disabled={disabled}
              className={inputVariants({ state: currentState })}
              data-slot="crypto-input"
              {...props}
            />
            {balance !== "0" && (
              <button
                type="button"
                onClick={onMaxClick}
                disabled={disabled}
                className={maxButtonVariants({ state: currentState })}
                data-slot="max-button"
              >
                MAX
              </button>
            )}
          </div>

          {/* Balance info row */}
          <div className="flex h-5 w-full items-center justify-end gap-0.5 text-right">
            <WalletIcon
              className={cn(
                balanceTextVariants({ state: currentState }),
                "h-4 w-4 -translate-y-[2px] md:h-5 md:w-5",
              )}
            />
            <span className={balanceTextVariants({ state: currentState })}>
              {balance}
            </span>
            <span className={balanceTextVariants({ state: currentState })}>
              {token}
            </span>
            <span
              className={cn(
                balanceTextVariants({ state: currentState }),
                "underline decoration-dotted underline-offset-2",
              )}
            >
              Available
            </span>
          </div>

          {/* Error message badge */}
          {error && errorMessage && (
            <div className="bg-destructive pointer-events-none absolute top-0 left-0 z-20 rounded-tl-xl rounded-br-lg px-2 py-1 text-[10px] font-normal text-white md:rounded-tl-2xl md:px-3 md:text-xs">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    );
  },
);

CryptoAmountInput.displayName = "CryptoAmountInput";

export { CryptoAmountInput, WalletIcon };
