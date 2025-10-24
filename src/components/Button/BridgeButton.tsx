import { forwardRef } from "react";
import { css } from "styled-system/css";

import { BaseButton, type CommonButtonProps } from "./BaseButton";

/** A specialized bridge button component with unique styling and hover effects. */
export const BridgeButton = forwardRef<HTMLButtonElement, CommonButtonProps>(
  ({ disabled, fullWidth, iconSize = "md", ...props }, ref) => {
    const bridgeButtonStyles = css({
      width: fullWidth ? "full" : "auto",
      padding: "1rem",
      backgroundColor: "var(--Primary, #81FFBA)",
      color: "#000",
      border: "none",
      borderRadius: "var(--border-radius-sm, 8px)",
      fontSize: "lg",
      fontWeight: "bold",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: "8px 8px 0 0 #0337FF",
      transition: "all 0.2s ease",
      opacity: disabled ? 0.6 : 1,
      "&:hover": {
        transform: disabled ? "none" : "translateY(-1px)",
        backgroundColor: disabled ? "var(--Primary, #81FFBA)" : "#FFD935",
        boxShadow: disabled ? "8px 8px 0 0 #0337FF" : "-8px -8px 0 0 #0337FF",
      },
      "&:active": {
        transform: disabled ? "none" : "translateY(0)",
      },
      "&:focus": {
        outline: "2px solid #0337FF",
        outlineOffset: "2px",
      },
    });

    return (
      <BaseButton
        ref={ref}
        customStyles={bridgeButtonStyles}
        textTransform="uppercase"
        fontWeight="bold"
        fullWidth={fullWidth}
        iconSize={iconSize}
        {...props}
      />
    );
  }
);
BridgeButton.displayName = "BridgeButton";
