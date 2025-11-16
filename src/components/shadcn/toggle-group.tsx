import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleGroupVariants = cva(
  "inline-flex items-center justify-center rounded w-fit",
  {
    variants: {
      variant: {
        default: "bg-transparent gap-1 p-1",
        contained: "bg-white/[0.04] gap-[4px] p-[4px]",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-transparent rounded data-[state=on]:bg-[#81ffba] data-[state=on]:text-black data-[state=on]:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] data-[state=off]:text-muted-foreground",
        contained:
          "rounded-[4px] data-[state=on]:bg-primary data-[state=on]:text-black data-[state=off]:bg-transparent data-[state-off]:text-muted-foreground data-[state=off]:hover:bg-white/[0.08]",
      },
      size: {
        default: "h-8 px-4 text-base",
        sm: "h-6 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleGroupVariants>
>({
  size: "default",
  variant: "default",
});

type ToggleGroupSingleProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleGroupVariants> & {
    type: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    required?: boolean;
  };

type ToggleGroupMultipleProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleGroupVariants> & {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    required?: never;
  };

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

function ToggleGroup({
  className,
  variant,
  size,
  children,
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const required =
    "required" in props && props.required !== undefined
      ? props.required
      : false;

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState<
    string | string[] | undefined
  >(defaultValue);

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string | string[]) => {
      // If required is true and value is empty (deselection attempt), prevent the change
      if (required && type === "single" && !newValue) {
        return;
      }

      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Call external onChange handler
      if (type === "single" && typeof newValue === "string") {
        (onValueChange as ((value: string) => void) | undefined)?.(newValue);
      } else if (type === "multiple" && Array.isArray(newValue)) {
        (onValueChange as ((value: string[]) => void) | undefined)?.(newValue);
      }
    },
    [required, type, isControlled, onValueChange],
  );

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(toggleGroupVariants({ variant, size }), className)}
      type={type}
      value={value as string & string[]}
      onValueChange={handleValueChange}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleGroupItemVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        toggleGroupItemVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export {
  ToggleGroup,
  ToggleGroupItem,
  // eslint-disable-next-line react-refresh/only-export-components
  toggleGroupVariants,
  // eslint-disable-next-line react-refresh/only-export-components
  toggleGroupItemVariants,
};
