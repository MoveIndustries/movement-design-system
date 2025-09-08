"use client";

import {
  createToaster as arkCreateToaster,
  Toaster as ArkToaster,
} from "@ark-ui/react/toast";
import { css } from "styled-system/css";
import { token } from "styled-system/tokens";

import { Toast } from "./Toast";
import { type ToastProps } from "./types";

export interface CreateToastArgs extends ToastProps {
  /** The optional id of the toast. This can be used to update or dismiss the toast programmatically. */
  id?: string;
  /** The duration of the toast in milliseconds. This will override the default duration. */
  duration?: number;
}

const createToasterReturn = createToaster();

/** The component from which toast messages are rendered */
export const Toaster = createToasterReturn[0];

/**
 * When invoked, a toast message will be displayed.
 * The `Toaster` must be mounted in the component tree for the toast message to be displayed.
 */
export const toast = createToasterReturn[1];

export function createToaster() {
  const toaster = arkCreateToaster({
    placement: "bottom-end",
    offsets: token("spacing.16"),
    overlap: false,
    removeDelay: 200, // This maps to durations.100
  });

  const upsertToast = ({ id, duration, ...props }: CreateToastArgs) => {
    // Ensure we always have an id
    const toastId =
      id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    toaster.create({
      id: toastId,
      type: duration === Infinity ? "loading" : "custom",
      duration: duration ?? 5000,
      meta: props,
    });
  };

  const dismissToast = (id?: string) => {
    toaster.dismiss(id);
  };

  /**
   * A function to create a toast. If an id is provided and there's an existing toast with that id,
   * the toast will be updated.
   *
   * Additionally, toasts can be dismissed with `toast.dismiss`.
   */
  const toast = Object.assign(upsertToast, {
    /** Dismisses a toast by id. If no id is provided, all toasts will be dismissed. */
    dismiss: dismissToast,
  });

  /**
   * The component from which toasts will appear.
   * This component should be placed once at the root of your application.
   */
  const Toaster = () => (
    <ArkToaster toaster={toaster} className={css({ zIndex: "toast!" })}>
      {(toast) => {
        const props = toast.meta as unknown as ToastProps;
        // Ensure we always have a valid id
        const toastId =
          toast.id ||
          `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // Debug logging
        console.log("Toast data:", { toast, props, toastId });

        return <Toast {...props} id={toastId} />;
      }}
    </ArkToaster>
  );

  return [Toaster, toast] as const;
}
