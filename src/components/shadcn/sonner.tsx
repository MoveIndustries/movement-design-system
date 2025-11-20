"use client";

/* eslint-disable react-refresh/only-export-components */

import { Toaster as SonnerToaster } from "sonner";
import { toast as sonnerToast } from "sonner";
import { useTheme } from "next-themes";
import { ToastComponent } from "./toast";
import { type ToastVariant } from "./toast-types";
import { useIsMobile } from "@/hooks/use-mobile";

export interface CreateToastArgs {
  /** The variant of the toast message. */
  variant: ToastVariant;
  /** The title of the toast message. */
  title?: string;
  /** The description of the toast message to be displayed below the title. */
  description: string | (() => React.ReactNode);
  /** The optional id of the toast. This can be used to update or dismiss the toast programmatically. */
  id?: string;
  /** The duration of the toast in milliseconds. This will override the default duration. */
  duration?: number;
}

export type TypedToastArgs = Omit<CreateToastArgs, "variant">;

const createToast = (props: CreateToastArgs) => {
  const { variant, title, description, id, duration } = props;

  return sonnerToast.custom(
    (t) => (
      <ToastComponent
        variant={variant}
        title={title}
        description={description}
        onClose={() => sonnerToast.dismiss(t)}
      />
    ),
    {
      id,
      duration: duration ?? 5000,
      unstyled: true,
    },
  );
};

const dismissToast = (id?: string) => {
  return sonnerToast.dismiss(id);
};

/**
 * A function to create a toast. If an id is provided and there's an existing toast with that id,
 * the toast will be updated.
 *
 * Additionally, toasts can be dismissed with `toast.dismiss`.
 */
export const toast = Object.assign(createToast, {
  /** Dismisses a toast by id. If no id is provided, all toasts will be dismissed. */
  dismiss: dismissToast,
  /** Creates a success toast */
  success: (message: string | TypedToastArgs) => {
    if (typeof message === "string") {
      createToast({ variant: "success", title: "", description: message });
    } else {
      createToast({ variant: "success", ...message });
    }
  },
  /** Creates an error toast */
  error: (message: string | TypedToastArgs) => {
    if (typeof message === "string") {
      createToast({ variant: "error", title: "", description: message });
    } else {
      createToast({ variant: "error", ...message });
    }
  },
  /** Creates a warning toast */
  warning: (message: string | TypedToastArgs) => {
    if (typeof message === "string") {
      createToast({ variant: "warning", title: "", description: message });
    } else {
      createToast({ variant: "warning", ...message });
    }
  },
  /** Creates an info toast */
  info: (message: string | TypedToastArgs) => {
    if (typeof message === "string") {
      createToast({ variant: "info", title: "", description: message });
    } else {
      createToast({ variant: "info", ...message });
    }
  },
});

/**
 * The component from which toasts will appear.
 * This component should be placed once at the root of your application.
 */
export const Toaster = () => {
  const { theme = "system" } = useTheme();
  const isMobile = useIsMobile();

  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      expand={true}
      position={isMobile ? "top-center" : "bottom-right"}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "w-full",
        },
      }}
      visibleToasts={isMobile ? 1 : 3}
    />
  );
};
