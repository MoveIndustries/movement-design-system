"use client";

import { Collapsible as ArkCollapsible } from "@ark-ui/react/collapsible";
import { forwardRef } from "react";
import { css, cx } from "styled-system/css";
import type { CollapsibleComponentProps, CollapsibleProps } from "./types";

/**
 * Root component that provides the collapsible functionality.
 * Wraps the Ark UI Collapsible.Root with additional styling and behavior.
 */
export const Root = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ onOpenChange, mountOnlyWhenVisible, ...props }, ref) => {
    return (
      <ArkCollapsible.Root
        ref={ref}
        lazyMount={mountOnlyWhenVisible}
        unmountOnExit={mountOnlyWhenVisible}
        onOpenChange={({ open }) => onOpenChange?.(open)}
        {...props}
      />
    );
  }
);
Root.displayName = "Collapsible";

/**
 * Trigger component that toggles the collapsible open/closed state.
 * Renders as a button by default and handles click events to expand/collapse content.
 */
export const Trigger = forwardRef<HTMLButtonElement, CollapsibleComponentProps>(
  (props, ref) => {
    return <ArkCollapsible.Trigger ref={ref} {...props} />;
  }
);
Trigger.displayName = "Collapsible.Trigger";

/**
 * Content component that contains the collapsible section.
 * Applies smooth expand/collapse animations and handles overflow properly.
 * The content will animate vertically when the trigger is clicked.
 */
export const Content = forwardRef<HTMLDivElement, CollapsibleComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <ArkCollapsible.Content
        ref={ref}
        className={cx(contentStyles, className)}
        {...props}
      />
    );
  }
);
Content.displayName = "Collapsible.Content";

/**
 * CSS styles for the collapsible content with smooth animations.
 * Uses CSS animations for expand/collapse transitions with proper duration timing.
 */
const contentStyles = css({
  overflow: "hidden",
  "&[data-state='open']": {
    animation: "[expandHeight {durations.100} ease]",
  },
  "&[data-state='closed']": {
    animation: "[collapseHeight {durations.100} ease]",
  },
});
