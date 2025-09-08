import { ComponentType, ReactNode, forwardRef } from "react";
import { css, cx } from "styled-system/css";

// Mock icon components for alert
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

const IconError = ({ className }: { className?: string }) => (
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

const IconSuccess = ({ className }: { className?: string }) => (
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

export const alertVariants = ["info", "warning", "error", "success"] as const;
export type AlertVariant = (typeof alertVariants)[number];

export interface AlertProps {
  /** The variant of the alert */
  variant?: AlertVariant;
  /** The title of the alert */
  title?: string;
  /** The content of the alert */
  children: ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when the alert is dismissed */
  onDismiss?: () => void;
  /** An optional icon to display before the content */
  icon?: ComponentType<{ className?: string }>;
  /** Additional CSS classes */
  className?: string;
}

const alertStyles = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "3",
  p: "4",
  borderRadius: "lg",
  border: "1px solid",
  position: "relative",
});

const variantStyles = {
  info: css({
    bg: "neutrals.blue.50",
    borderColor: "neutrals.blue.200",
    color: "neutrals.blue.900",
  }),
  warning: css({
    bg: "neutrals.yellow.50",
    borderColor: "neutrals.yellow.200",
    color: "neutrals.yellow.900",
  }),
  error: css({
    bg: "neutrals.red.50",
    borderColor: "neutrals.red.200",
    color: "neutrals.red.900",
  }),
  success: css({
    bg: "neutrals.green.50",
    borderColor: "neutrals.green.200",
    color: "neutrals.green.900",
  }),
};

const iconStyles = css({
  flexShrink: "0",
  mt: "0.5",
});

const contentStyles = css({
  flex: "1",
  minW: "0",
});

const titleStyles = css({
  fontSize: "sm",
  fontWeight: "semibold",
  mb: "1",
});

const descriptionStyles = css({
  fontSize: "sm",
  color: "inherit",
  opacity: "0.9",
});

const dismissButtonStyles = css({
  flexShrink: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  w: "6",
  h: "6",
  borderRadius: "md",
  cursor: "pointer",
  color: "inherit",
  opacity: "0.7",
  transition: "all 0.2s ease",
  _hover: {
    opacity: "1",
    bg: "currentColor",
    // opacity: "0.1",
  },
});

const iconMap: Record<AlertVariant, ComponentType<{ className?: string }>> = {
  info: IconInfo,
  warning: IconWarning,
  error: IconError,
  success: IconSuccess,
};

/** An alert component for displaying important messages */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      title,
      children,
      dismissible = false,
      onDismiss,
      icon,
      className,
    },
    ref
  ) => {
    const Icon = icon || iconMap[variant];
    const variantStyle = variantStyles[variant];

    return (
      <div ref={ref} className={cx(alertStyles, variantStyle, className)}>
        <Icon className={iconStyles} />
        <div className={contentStyles}>
          {title && <div className={titleStyles}>{title}</div>}
          <div className={descriptionStyles}>{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            className={dismissButtonStyles}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          >
            <IconX />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";
