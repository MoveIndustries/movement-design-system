import type { ComponentType } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { type ToastVariant } from "./toast-types";
import { Info, AlertTriangle, CheckCircle2, X } from "lucide-react";

/**
 * A message that appears on the screen to provide feedback on an action, or provide a notification
 * of an event that has occurred.
 */
interface ToastComponentProps {
  variant: ToastVariant;
  title?: string;
  description: string | (() => React.ReactNode);
  onClose: () => void;
}

export function ToastComponent({
  variant,
  title,
  description,
  onClose,
}: ToastComponentProps) {
  const Icon = iconMap[variant];
  return (
    <div className={toastRecipe({ variant })}>
      <Icon className={iconRecipe({ variant })} />
      <div className="flex flex-col gap-1">
        {title && <div className={titleRecipe({ variant })}>{title}</div>}
        <div className={descriptionRecipe({ variant })}>
          {typeof description === "function" ? description() : description}
        </div>
      </div>
      <button onClick={onClose} className="cursor-pointer self-start">
        <X
          className={cn(
            "m-[2px] h-4 w-4",
            variant === "success" ? "text-black" : "text-white",
          )}
        />
      </button>
    </div>
  );
}

const iconMap: Record<ToastVariant, ComponentType<{ className?: string }>> = {
  info: Info,
  error: AlertTriangle,
  warning: AlertTriangle,
  success: CheckCircle2,
};

// Toast recipe using CVA
const toastRecipe = cva(
  [
    // Base styles
    "grid",
    "grid-cols-[auto_minmax(0,1fr)_auto]",
    "p-3",
    "pb-4",
    "relative",
    "gap-x-2",
    "max-w-[356px]",
    "w-full",
  ],
  {
    variants: {
      variant: {
        info: ["text-black", "bg-[#6ce2a1]"],
        error: ["text-white", "bg-[#D82C2D]"],
        warning: ["text-white", "bg-[#D82C2D]"],
        success: ["text-black", "bg-[#6ce2a1]"],
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

// Icon recipe using CVA
const iconRecipe = cva(["h-5", "w-5"], {
  variants: {
    variant: {
      info: ["text-white"],
      error: ["text-white"],
      warning: ["text-white"],
      success: ["text-black"],
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

// Title recipe using CVA
const titleRecipe = cva(["text-sm", "font-medium"], {
  variants: {
    variant: {
      info: [],
      error: [],
      warning: [],
      success: ["text-base", "font-bold", "text-black", "leading-[1.5]"],
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

// Description recipe using CVA
const descriptionRecipe = cva(["text-sm"], {
  variants: {
    variant: {
      info: [],
      error: [],
      warning: [],
      success: ["text-base", "font-normal", "text-black", "leading-[1.4]"],
    },
  },
  defaultVariants: {
    variant: "info",
  },
});
