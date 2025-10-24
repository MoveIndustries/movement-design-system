"use client";

import {
  createToaster as arkCreateToaster,
  Toaster as ArkToaster,
} from "@ark-ui/react/toast";
import { css } from "styled-system/css";

import { Toast } from "./Toast";
import { type ToastProps } from "./types";
import { useState, useEffect } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

// Helper function to determine if screen is mobile
export function useIsMobile(): boolean {
  const { width } = useWindowSize();

  // Consider mobile if width is less than 768px (md breakpoint)
  return width !== undefined && width < 900;
}
export interface CreateToastArgs extends Omit<ToastProps, "id"> {
  /** The optional id of the toast. This can be used to update or dismiss the toast programmatically. */
  id?: string;
  /** The duration of the toast in milliseconds. This will override the default duration. */
  duration?: number;
}

export type TypedToastArgs = Omit<CreateToastArgs, "variant">;

export function createToaster() {
  const toaster = arkCreateToaster({
    placement: "bottom-end",
    offsets: "1rem",
    overlap: false,
    removeDelay: 200, // This maps to durations.100
    // gap: 120, // Add gap between toasts (12px)
  });

  const mobileToaster = arkCreateToaster({
    placement: "top",
    removeDelay: 100,
    max: 1
  });

  // Track the current mobile state to ensure toast creation and rendering use the same toaster
  let currentIsMobile = false;

  const createToast = (props: CreateToastArgs) => {
    // Ensure we always have an id
    const toastId =
      props.id ||
      `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const activeToaster = currentIsMobile ? mobileToaster : toaster;

    return activeToaster.create({
      id: toastId,
      type: props.duration === Infinity ? "loading" : "custom",
      duration: props.duration ?? 5000,
      meta: props,
    });
  };

  const dismissToast = (id?: string) => {
    const activeToaster = currentIsMobile ? mobileToaster : toaster;
    return activeToaster.dismiss(id);
  };

  /**
   * A function to create a toast. If an id is provided and there's an existing toast with that id,
   * the toast will be updated.
   *
   * Additionally, toasts can be dismissed with `toast.dismiss`.
   */
  const toast = Object.assign(createToast, {
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
  const Toaster = () => {
    const isMobile = useIsMobile();
    // Update the current mobile state so toast creation uses the correct toaster
    currentIsMobile = isMobile;

    return (
      <ArkToaster toaster={isMobile ? mobileToaster : toaster} className={css({ zIndex: "toast!" })}>
        {(toast) => {
          const props = toast.meta as unknown as ToastProps;
          return <Toast {...props} />;
        }}
      </ArkToaster>
    );
  };

  return [Toaster, toast] as const;
}
