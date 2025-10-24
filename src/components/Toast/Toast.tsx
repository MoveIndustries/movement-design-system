import { Toast as ArkToast } from "@ark-ui/react/toast";
import { ComponentType } from "react";
import { css, cva } from "styled-system/css";
import { stack } from "styled-system/patterns";

import { type ToastProps, type ToastVariant } from "./types";
import { InfoIcon, WarningIcon, CheckIcon, XIcon } from "@phosphor-icons/react";

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
        {title && (
          <ArkToast.Title className={titleRecipe({ variant })}>
            {title}
          </ArkToast.Title>
        )}
        <ArkToast.Description className={descriptionRecipe({ variant })}>
          {typeof description === "function" ? description() : description}
        </ArkToast.Description>
      </div>
      <ArkToast.CloseTrigger
        className={css({ alignSelf: "start", cursor: "pointer" })}
      >
        <XIcon
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
  info: InfoIcon,
  error: WarningIcon,
  warning: WarningIcon,
  success: CheckIcon,
};

// Toast recipe using CVA
const toastRecipe = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "[auto minmax(0, 1fr) auto]",
    columnGap: {base: "0", md: "2"},
    rounded: {base: "none", md: "primary"},
    p: "3",
    pb: "4",
    m: {base: "-4", md: "0"},
    w: {base: "100vw", md: "[calc(100vw - 48px)]"},
    maxW: {base: "100vw", md: "[356px]"},
    position: "relative",
    scale: "var(--scale)",
    translate: "[var(--x) var(--y) 0]",
    opacity: "var(--opacity)",
    willChange: "translate, opacity, scale",
    zIndex: "var(--z-index)",
    transitionDuration: "100",
    transitionProperty: "translate, scale, opacity",
    transitionTimingFunction: "default",
    _open: { animation: {base: "slideInFromTop {durations.100} ease-out", md: "slideInFromBottom {durations.100} ease-out"} },
    _closed: { animation: {base: "slideOutToTop {durations.100} ease-out", md: "slideOutToBottom {durations.100} ease-in"} },
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
