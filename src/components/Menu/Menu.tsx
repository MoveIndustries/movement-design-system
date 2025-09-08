import { Menu as ArkMenu } from "@ark-ui/react/menu";
import { ComponentType, ReactNode, forwardRef } from "react";
import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";

// Mock icon components for menu items
const IconChevronRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export interface MenuItemProps {
  /** The content to display in the menu item */
  children: ReactNode;
  /** Whether the menu item is disabled */
  disabled?: boolean;
  /** Whether the menu item is selected */
  selected?: boolean;
  /** An icon to display before the content */
  icon?: ComponentType<{ className?: string }>;
  /** An icon to display after the content */
  endIcon?: ComponentType<{ className?: string }>;
  /** Click handler for the menu item */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export interface MenuSeparatorProps {
  /** Additional CSS classes */
  className?: string;
}

export interface MenuProps {
  /** The trigger element that opens the menu */
  trigger: ReactNode;
  /** Menu items to display */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the menu is disabled */
  disabled?: boolean;
}

const menuStyles = css({
  bg: "neutrals.white",
  border: "1px solid",
  borderColor: "neutrals.blackAlpha.200",
  borderRadius: "md",
  boxShadow: "lg",
  minW: "200px",
  p: "1",
  zIndex:"dropdown"
});

const menuItemStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "3",
  px: "3",
  py: "2",
  borderRadius: "sm",
  cursor: "pointer",
  transition: "all 0.2s ease",
  color: "neutrals.blackAlpha.900",
  fontSize: "sm",
  fontWeight: "medium",
  _hover: {
    bg: "neutrals.blackAlpha.100",
  },
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    _hover: {
      bg: "transparent",
    },
  },
  _selected: {
    bg: "moveus-marigold.100",
    color: "moveus-marigold.800",
  },
});

const menuSeparatorStyles = css({
  h: "1px",
  bg: "neutrals.blackAlpha.200",
  mx: "1",
  my: "1",
});

const iconStyles = css({
  w: "4",
  h: "4",
  color: "neutrals.blackAlpha.600",
});

const endIconStyles = css({
  w: "4",
  h: "4",
  color: "neutrals.blackAlpha.400",
  ml: "auto",
});

const checkIconStyles = css({
  w: "4",
  h: "4",
  color: "moveus-marigold.600",
});

/** A menu item component for displaying interactive options */
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      disabled,
      selected,
      icon: Icon,
      endIcon: EndIcon,
      onClick,
      className,
    },
    ref
  ) => {
    return (
      <ArkMenu.Item
        ref={ref}
        disabled={disabled}
        className={css(menuItemStyles, className)}
        onClick={onClick}
      >
        {selected && <IconCheck className={checkIconStyles} />}
        {!selected && Icon && <Icon className={iconStyles} />}
        <span>{children}</span>
        {EndIcon && <EndIcon className={endIconStyles} />}
      </ArkMenu.Item>
    );
  }
);
MenuItem.displayName = "MenuItem";

/** A separator component for dividing menu sections */
export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className }, ref) => {
    return <div ref={ref} className={css(menuSeparatorStyles, className)} />;
  }
);
MenuSeparator.displayName = "MenuSeparator";

/** A menu component that displays a list of interactive options */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ trigger, children, className, disabled }, ref) => {
    return (
      <ArkMenu.Root>
        <ArkMenu.Trigger asChild disabled={disabled}>
          {trigger}
        </ArkMenu.Trigger>
        <ArkMenu.Positioner>
          <ArkMenu.Content
            ref={ref}
            className={cx(menuStyles, className)}
            portalled={false}
          >
            <ArkMenu.ItemGroup>
              <ArkMenu.ItemGroupLabel className={css({ display: "none" })} />
              {children}
            </ArkMenu.ItemGroup>
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </ArkMenu.Root>
    );
  }
);
Menu.displayName = "Menu";
