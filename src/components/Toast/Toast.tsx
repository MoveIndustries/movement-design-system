import { Toast as ArkToast } from "@ark-ui/react/toast";
import { ComponentType } from "react";
import { css, cva } from "styled-system/css";
import { stack } from "styled-system/patterns";

import { type ToastProps, type ToastVariant } from "./types";

// Mock icon components since the generated icon files are not available
const IconWarning = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L1 21h22L12 2zm0 3.17L19.83 19H4.17L12 5.17zM11 16h2v2h-2zm0-6h2v4h-2z" />
  </svg>
);

const IconWarningOctagon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L19.764 8 12 11.236 4.236 8 12 4.236zM12 13.236L19.764 10v6L12 19.236 4.236 16v-6L12 13.236z" />
  </svg>
);

const IconX = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const IconInfo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const IconCheckCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

/**
 * A message that appears on the screen to provide feedback on an action, or provide a notification
 * of an event that has occurred.
 */
export function Toast({ variant, title, description, id }: ToastProps) {
  const Icon = iconMap[variant];
  return (
    <ArkToast.Root className={toastRecipe({ variant })} id={id}>
      <Icon className={iconRecipe({ variant })} />
      <div className={stack({ gap: "4" })}>
        <ArkToast.Title className={titleRecipe({ variant })}>
          {title}
        </ArkToast.Title>
        <ArkToast.Description className={descriptionRecipe({ variant })}>
          {typeof description === "function" ? description() : description}
        </ArkToast.Description>
      </div>
      <ArkToast.CloseTrigger
        className={css({ alignSelf: "start", cursor: "pointer" })}
      >
        <IconX
          className={css({
            color: variant === "success" ? "black" : "toast.icon.close",
            h: "4",
            w: "4",
            m: "[2px]",
          })}
        />
      </ArkToast.CloseTrigger>
    </ArkToast.Root>
  );
}

const iconMap: Record<ToastVariant, ComponentType<{ className?: string }>> = {
  info: IconInfo,
  error: IconWarningOctagon,
  warning: IconWarning,
  success: IconCheckCircle,
};

// Toast recipe using CVA
const toastRecipe = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "[auto minmax(0, 1fr) auto]",
    columnGap: "2",
    rounded: "primary",
    p: "3",
    pb: "4",
    w: "[calc(100vw - 48px)]",
    maxW: "[356px]",
    position: "relative",
    scale: "var(--scale)",
    translate: "[var(--x) var(--y) 0]",
    opacity: "var(--opacity)",
    willChange: "translate, opacity, scale",
    zIndex: "var(--z-index)",
    transitionDuration: "100",
    transitionProperty: "translate, scale, opacity",
    transitionTimingFunction: "default",
    _open: { animation: "slideInFromBottom {durations.100} ease-out" },
    _closed: { animation: "slideOutToBottom {durations.100} ease-in" },
  },
  variants: {
    variant: {
      info: {
        color: "black",
        bg: "guild-green.400",
      },
      error: {
        color: "white",
        bg: "#D82C2D",
      },
      warning: {
        color: "white",
        bg: "#D82C2D",
      },
      success: {
        color: "black",
        bg: "guild-green.400",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

// Icon recipe using CVA
const iconRecipe = cva({
  base: {
    h: "5",
    w: "5",
  },
  variants: {
    variant: {
      info: { color: "toast.text" },
      error: { color: "toast.text" },
      warning: { color: "toast.text" },
      success: { color: "black" },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

// Title recipe using CVA
const titleRecipe = cva({
  base: {
    textStyle: "label.md",
  },
  variants: {
    variant: {
      info: {},
      error: {},
      warning: {},
      success: {
        textStyle: "body-bold.md",
        color: "black",
        lineHeight: "1.5",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

// Description recipe using CVA
const descriptionRecipe = cva({
  base: {
    textStyle: "body.sm",
  },
  variants: {
    variant: {
      info: {},
      error: {},
      warning: {},
      success: {
        textStyle: "body-regular.md",
        color: "black",
        lineHeight: "1.4",
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});
