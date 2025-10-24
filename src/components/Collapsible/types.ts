import { ReactNode } from "react";

export interface CollapsibleComponentProps {
  /**
   * When true, renders the component as its child element instead of the default div.
   * Useful for semantic HTML or when you need to render as a different element.
   */
  asChild?: boolean;
  /**
   * The content to be rendered inside the collapsible component.
   * Can be any valid React node including text, elements, or other components.
   */
  children?: ReactNode;
  /**
   * Additional CSS classes to apply to the component.
   * These will be merged with the component's default styles.
   */
  className?: string;
}

export interface CollapsibleProps extends CollapsibleComponentProps {
  /**
   * Controls whether the collapsible content is expanded or collapsed.
   * Use this prop when you want to control the open/closed state externally.
   * This makes the component a controlled component.
   * Otherwise, the component can handle its own state.
   */
  open?: boolean;
  /**
   * Callback function triggered when the collapsible's open state changes.
   * Receives the new open state (boolean) as a parameter.
   * Useful for syncing state with parent components or handling state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Sets the initial open state when the component first mounts.
   * Use this when you want the collapsible to start in a specific state
   * but don't need to control it externally (uncontrolled component).
   */
  defaultOpen?: boolean;
  /**
   * When true, disables the trigger button and prevents the collapsible from toggling.
   * The content will remain in its current state until disabled is set to false.
   */
  disabled?: boolean;
  /**
   * Performance optimization: when true, the collapsible content is only mounted
   * when visible and unmounted when hidden. This reduces DOM nodes and memory usage
   * for expensive-to-render content, but may cause layout shifts on first open.
   */
  mountOnlyWhenVisible?: boolean;
}
