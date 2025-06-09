import { css } from "../../../styled-system/css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", children }: ButtonProps) => (
  <button
    className={css({
      bg: variant === "primary" ? "colors.primary" : "colors.background",
      color: variant === "primary" ? "#FFFFFF" : "colors.primary",
      padding: "spacing.md",
      borderRadius: "4px",
    })}
  >
    {children}
  </button>
);
