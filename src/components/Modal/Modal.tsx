import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { ComponentType, ReactNode, forwardRef } from "react";
import { css, cx } from "styled-system/css";

// Mock icon components for modal
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

export interface ModalHeaderProps {
  /** The title of the modal */
  title: string;
  /** An optional icon to display before the title */
  icon?: ComponentType<{ className?: string }>;
  /** Additional CSS classes */
  className?: string;
}

export interface ModalBodyProps {
  /** The content of the modal body */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ModalFooterProps {
  /** The content of the modal footer */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** The content of the modal */
  children: ReactNode;
  /** The size of the modal */
  size?: "sm" | "md" | "lg" | "xl" | "full" | "dynamic";
  /** Whether the modal can be closed by clicking the backdrop */
  closeOnBackdropClick?: boolean;
  /** Whether the modal can be closed by pressing the escape key */
  closeOnEscape?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const modalOverlayStyles = css({
  position: "fixed",
  inset: "0",
  bg: "neutrals.blackAlpha.600",
  zIndex: "overlay",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: "4",
  // Ensure it covers the entire viewport
  width: "100vw",
  height: "100vh",
});

const modalContentStyles = css({
  bg: "transparent",
  borderRadius: "lg",
  boxShadow: "2xl",
  maxH: "90vh",
  overflow: "hidden",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "modal",
});

const sizeStyles = {
  sm: { maxW: "400px", w: "full" },
  md: { maxW: "500px", w: "full" },
  lg: { maxW: "700px", w: "full" },
  xl: { maxW: "900px", w: "full" },
  full: { maxW: "95vw", maxH: "95vh", w: "full" },
  dynamic: { maxW: "100%", maxH: "100%", w: "auto" },
};

const modalHeaderStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "3",
  p: "6",
  pb: "4",
  borderBottom: "1px solid",
  borderColor: "neutrals.blackAlpha.200",
});

const modalTitleStyles = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "neutrals.blackAlpha.900",
  flex: "1",
});

const modalCloseButtonStyles = css({
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

const modalBodyStyles = css({
  p: "6",
  overflow: "auto",
  flex: "1",
});

const modalFooterStyles = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "3",
  p: "6",
  pt: "4",
  borderTop: "1px solid",
  borderColor: "neutrals.blackAlpha.200",
  bg: "neutrals.blackAlpha.50",
});

const iconStyles = css({
  w: "6",
  h: "6",
  color: "neutrals.blackAlpha.600",
});

/** Modal header component with title and close button */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, icon: Icon, className }, ref) => {
    return (
      <div ref={ref} className={cx(modalHeaderStyles, className)}>
        {Icon && <Icon className={iconStyles} />}
        <h2 className={modalTitleStyles}>{title}</h2>
        <ArkDialog.CloseTrigger className={modalCloseButtonStyles}>
          <IconX className={css({ w: "5", h: "5" })} />
        </ArkDialog.CloseTrigger>
      </div>
    );
  }
);
ModalHeader.displayName = "ModalHeader";

/** Modal body component for main content */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cx(modalBodyStyles, className)}>
        {children}
      </div>
    );
  }
);
ModalBody.displayName = "ModalBody";

/** Modal footer component for actions */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cx(modalFooterStyles, className)}>
        {children}
      </div>
    );
  }
);
ModalFooter.displayName = "ModalFooter";

/** A modal component for displaying overlay content */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      children,
      size = "md",
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className,
    },
    ref
  ) => {
    return (
      <ArkDialog.Root
        open={open}
        onOpenChange={(details) => {
          if (!details.open) {
            onClose();
          }
        }}
        closeOnEscape={closeOnEscape}
        closeOnInteractOutside={closeOnBackdropClick}
      >
        <ArkDialog.Backdrop className={modalOverlayStyles} />
        <ArkDialog.Positioner>
          <ArkDialog.Content
            ref={ref}
            className={cx(
              modalContentStyles,
              css({ ...sizeStyles[size] }),
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
Modal.displayName = "Modal";
