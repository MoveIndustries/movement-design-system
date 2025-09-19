import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { ComponentType, ReactNode, forwardRef } from "react";
import { css, cx } from "styled-system/css";

// Mock icon component for drawer
const IconX = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

export interface DrawerHeaderProps {
  /** The title of the drawer */
  title: string;
  /** An optional icon to display before the title */
  icon?: ComponentType<{ className?: string }>;
  /** Additional CSS classes */
  className?: string;
}

export interface DrawerBodyProps {
  /** The content of the drawer body */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface DrawerFooterProps {
  /** The content of the drawer footer */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when the drawer should close */
  onClose: () => void;
  /** The content of the drawer */
  children: ReactNode;
  /** The placement of the drawer */
  placement?: "top" | "bottom" | "left" | "right";
  /** The size of the drawer */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Whether the drawer can be closed by clicking the backdrop */
  closeOnBackdropClick?: boolean;
  /** Whether the drawer can be closed by pressing the escape key */
  closeOnEscape?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const drawerOverlayStyles = css({
  position: "fixed",
  inset: "0",
  bg: "neutrals.blackAlpha.600",
  zIndex: "overlay",
  animation: "fadeIn 0.2s ease-out",
  _closed: {
    animation: "fadeOut 0.2s ease-in",
  },
});

const drawerContentStyles = css({
  position: "fixed",
  bg: "transparent",
  boxShadow: "2xl",
  display: "flex", 
  flexDirection: "column",
  overflow: "hidden",
  transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
  zIndex: "modal",
});

const getPlacementStyles = (placement: string) => {
  switch (placement) {
    case "top":
      return css({
        top: "0",
        left: "0",
        right: "0",
        borderBottomRadius: "lg",
        transform: "translateY(-100%)",
        animation: "slideInFromTop 0.3s ease-out forwards",
        _closed: {
          animation: "slideOutToTop 0.3s ease-in forwards",
        },
      });
    case "bottom":
      return css({
        bottom: "0",
        left: "0",
        right: "0",
        borderTopRadius: "lg",
        transform: "translateY(100%)",
        animation: "slideInFromBottom 0.3s ease-out forwards",
        _closed: {
          animation: "slideOutToBottom 0.3s ease-in forwards",
        },
      });
    case "left":
      return css({
        top: "0",
        left: "0",
        bottom: "0",
        borderRightRadius: "lg",
        transform: "translateX(-100%)",
        animation: "slideInFromLeft 0.3s ease-out forwards",
        _closed: {
          animation: "slideOutToLeft 0.3s ease-in forwards",
        },
      });
    case "right":
    default:
      return css({
        top: "0",
        right: "0",
        bottom: "0",
        borderLeftRadius: "lg",
        transform: "translateX(100%)",
        animation: "slideInFromRight 0.3s ease-out forwards",
        _closed: {
          animation: "slideOutToRight 0.3s ease-in forwards",
        },
      });
  }
};

const getSizeStyles = (size: string, placement: string) => {
  const sizeMap = {
    sm: { h: "300px", w: "300px" },
    md: { h: "400px", w: "400px" },
    lg: { h: "500px", w: "500px" },
    xl: { h: "600px", w: "600px" },
    full: { h: "100vh", w: "100vw" },
  };

  const dimensions = sizeMap[size as keyof typeof sizeMap] || sizeMap.md;

  if (placement === "top" || placement === "bottom") {
    return css({ h: dimensions.h });
  } else {
    return css({ w: dimensions.w });
  }
};

const drawerHeaderStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "3",
  p: "6",
  pb: "4",
  borderBottom: "1px solid",
  borderColor: "neutrals.blackAlpha.200",
  flexShrink: "0",
});

const drawerTitleStyles = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "neutrals.blackAlpha.900",
  flex: "1",
});

const drawerCloseButtonStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  w: "8",
  h: "8",
  borderRadius: "md",
  cursor: "pointer",
  color: "neutrals.blackAlpha.600",
  transition: "all 0.2s ease",
  _hover: {
    bg: "neutrals.blackAlpha.100",
    color: "neutrals.blackAlpha.800",
  },
});

const drawerBodyStyles = css({
  p: "6",
  overflow: "auto",
  flex: "1",
});

const drawerFooterStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "3",
  p: "6",
  pt: "4",
  borderTop: "1px solid",
  borderColor: "neutrals.blackAlpha.200",
  bg: "neutrals.blackAlpha.50",
  flexShrink: "0",
});

const iconStyles = css({
  w: "5",
  h: "5",
  color: "neutrals.blackAlpha.600",
});

/** Drawer header component with title and close button */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ title, icon: Icon, className }, ref) => {
    return (
      <div ref={ref} className={cx(drawerHeaderStyles, className)}>
        {Icon && <Icon className={iconStyles} />}
        <h2 className={drawerTitleStyles}>{title}</h2>
        <ArkDialog.CloseTrigger className={drawerCloseButtonStyles}>
          <IconX className={css({ w: "5", h: "5" })} />
        </ArkDialog.CloseTrigger>
      </div>
    );
  }
);
DrawerHeader.displayName = "DrawerHeader";

/** Drawer body component for main content */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cx(drawerBodyStyles, className)}>
        {children}
      </div>
    );
  }
);
DrawerBody.displayName = "DrawerBody";

/** Drawer footer component for actions */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cx(drawerFooterStyles, className)}>
        {children}
      </div>
    );
  }
);
DrawerFooter.displayName = "DrawerFooter";

/** A drawer component for displaying slide-out content */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      children,
      placement = "right",
      size = "md",
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className,
    },
    ref
  ) => {
    const placementStyle = getPlacementStyles(placement);
    const sizeStyle = getSizeStyles(size, placement);

    return (
      <ArkDialog.Root
        open={open}
        onOpenChange={(details: { open: boolean }) => {
          if (!details.open) {
            onClose();
          }
        }}
        closeOnEscape={closeOnEscape}
        closeOnInteractOutside={closeOnBackdropClick}
      >
        <ArkDialog.Backdrop className={drawerOverlayStyles} />
        <ArkDialog.Positioner>
          <ArkDialog.Content
            ref={ref}
            className={cx(
              drawerContentStyles,
              placementStyle,
              sizeStyle,
              className
            )}
          >
            {children}
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </ArkDialog.Root>
    );
  }
);
Drawer.displayName = "Drawer";
