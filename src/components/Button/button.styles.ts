import { cva } from "styled-system/css";

export const buttonStyles = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    borderStyle: "solid",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    _focus: {
      outline: "2px solid",
      outlineColor: "blue.400",
      outlineOffset: "2px",
    },
  },

  variants: {
    variant: {
      filled: {
        borderWidth: "0",
      },
      outlined: {
        bg: "transparent",
        borderWidth: "1",
      },
    },
    color: {
      yellow: {
        bg: "moveus-marigold.400",
        color: "black",
        borderColor: "moveus-marigold.400",
        "&:hover:not(:disabled)": {
          bg: "moveus-marigold.500",
          borderColor: "moveus-marigold.500",
        },
        "&:active:not(:disabled)": {
          bg: "moveus-marigold.600",
          borderColor: "moveus-marigold.600",
        },
      },
      blue: {
        bg: "byzantine-blue.400",
        color: "white",
        borderColor: "byzantine-blue.400",
        "&:hover:not(:disabled)": {
          bg: "byzantine-blue.500",
          borderColor: "byzantine-blue.500",
        },
        "&:active:not(:disabled)": {
          bg: "byzantine-blue.600",
          borderColor: "byzantine-blue.600",
        },
      },
      pink: {
        bg: "protocol-pink.400",
        color: "white",
        borderColor: "protocol-pink.400",
        "&:hover:not(:disabled)": {
          bg: "protocol-pink.500",
          borderColor: "protocol-pink.500",
        },
        "&:active:not(:disabled)": {
          bg: "protocol-pink.600",
          borderColor: "protocol-pink.600",
        },
      },
      green: {
        bg: "guild-green.400",
        color: "white",
        borderColor: "guild-green.400",
        "&:hover:not(:disabled)": {
          bg: "guild-green.500",
          borderColor: "guild-green.500",
        },
        "&:active:not(:disabled)": {
          bg: "guild-green.600",
          borderColor: "guild-green.600",
        },
      },
      orange: {
        bg: "oracle-orange.400",
        color: "white",
        borderColor: "oracle-orange.400",
        "&:hover:not(:disabled)": {
          bg: "oracle-orange.500",
          borderColor: "oracle-orange.500",
        },
        "&:active:not(:disabled)": {
          bg: "oracle-orange.600",
          borderColor: "oracle-orange.600",
        },
      },
      gray: {
        bg: "neutrals.blackAlpha.200",
        color: "neutrals.black",
        borderColor: "neutrals.blackAlpha.200",
        "&:hover:not(:disabled)": {
          bg: "neutrals.blackAlpha.300",
          borderColor: "neutrals.blackAlpha.300",
        },
        "&:active:not(:disabled)": {
          bg: "neutrals.blackAlpha.400",
          borderColor: "neutrals.blackAlpha.400",
        },
      },
      red: {
        bg: "transparent",
        color: "feedback.error.default",
        borderColor: "feedback.error.default",
        "&:hover:not(:disabled)": {
          bg: "feedback.error.light",
          borderColor: "feedback.error.dark",
        },
        "&:active:not(:disabled)": {
          bg: "feedback.error.dark",
          borderColor: "feedback.error.dark",
          color: "white",
        },
      },
      white: {
        bg: "transparent",
        color: "white",
        borderColor: "white",
        "&:hover:not(:disabled)": {
          bg: "neutrals.whiteAlpha.100",
          borderColor: "neutrals.whiteAlpha.200",
        },
        "&:active:not(:disabled)": {
          bg: "neutrals.whiteAlpha.200",
          borderColor: "neutrals.whiteAlpha.300",
        },
      },
    },
    size: {
      sm: {
        px: "4",
        py: "2",
        h: "8",
        fontSize: "14px",
      },
      md: {
        px: "5",
        py: "3",
        h: "10",
        fontSize: "16px",
      },
      lg: {
        px: "6",
        py: "4",
        h: "12",
        fontSize: "18px",
      },
    },
    radius: {
      none: {
        rounded: "0",
      },
      sm: {
        rounded: "100",
      },
      md: {
        rounded: "200",
      },
      lg: {
        rounded: "300",
      },
      full: {
        rounded: "full",
      },
    },
  },

  compoundVariants: [
    // Outlined variants with different border styles
    {
      variant: "outlined",
      color: "yellow",
      css: {
        bg: "transparent",
        color: "moveus-marigold.400",
        borderColor: "moveus-marigold.400",
        "&:hover:not(:disabled)": {
          bg: "moveus-marigold.400",
          borderColor: "moveus-marigold.500",
          color: "neutrals.blackAlpha.600",
        },
        "&:active:not(:disabled)": {
          bg: "moveus-marigold.100",
          borderColor: "moveus-marigold.600",
          color: "moveus-marigold.600",
        },
      },
    },
    {
      variant: "outlined",
      color: "blue",
      css: {
        bg: "transparent",
        color: "byzantine-blue.400",
        borderColor: "byzantine-blue.400",
        "&:hover:not(:disabled)": {
          bg: "byzantine-blue.400",
          borderColor: "byzantine-blue.500",
          color: "neutrals.blackAlpha.600",
        },
        "&:active:not(:disabled)": {
          bg: "byzantine-blue.100",
          borderColor: "byzantine-blue.600",
          color: "byzantine-blue.600",
        },
      },
    },
    {
      variant: "outlined",
      color: "pink",
      css: {
        bg: "transparent",
        color: "protocol-pink.400",
        borderColor: "protocol-pink.400",
        "&:hover:not(:disabled)": {
          bg: "protocol-pink.400",
          borderColor: "protocol-pink.500",
          color: "neutrals.blackAlpha.600",
        },
        "&:active:not(:disabled)": {
          bg: "protocol-pink.100",
          borderColor: "protocol-pink.600",
          color: "protocol-pink.600",
        },
      },
    },
    {
      variant: "outlined",
      color: "green",
      css: {
        bg: "transparent",
        color: "guild-green.400",
        borderColor: "guild-green.400",
        "&:hover:not(:disabled)": {
          bg: "guild-green.400",
          borderColor: "guild-green.500",
          color: "neutrals.blackAlpha.600",
        },
        "&:active:not(:disabled)": {
          bg: "guild-green.100",
          borderColor: "guild-green.600",
          color: "guild-green.600",
        },
      },
    },
    {
      variant: "outlined",
      color: "orange",
      css: {
        bg: "transparent",
        color: "oracle-orange.400",
        borderColor: "oracle-orange.400",
        "&:hover:not(:disabled)": {
          bg: "oracle-orange.400",
          borderColor: "oracle-orange.500",
          color: "neutrals.blackAlpha.600",
        },
        "&:active:not(:disabled)": {
          bg: "oracle-orange.100",
          borderColor: "oracle-orange.600",
          color: "oracle-orange.600",
        },
      },
    },
    {
      variant: "outlined",
      color: "gray",
      css: {
        bg: "transparent",
        color: "neutrals.blackAlpha.600",
        borderColor: "neutrals.blackAlpha.300",
        "&:hover:not(:disabled)": {
          bg: "neutrals.blackAlpha.200",
          borderColor: "neutrals.blackAlpha.400",
          color: "neutrals.blackAlpha.700",
        },
        "&:active:not(:disabled)": {
          bg: "neutrals.blackAlpha.100",
          borderColor: "neutrals.blackAlpha.500",
          color: "neutrals.blackAlpha.800",
        },
      },
    },
  ],

  defaultVariants: {
    variant: "filled",
    color: "yellow",
    size: "md",
    radius: "md",
  },
});

export const iconStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    size: {
      sm: { h: "16", w: "16" },
      md: { h: "18", w: "18" },
      lg: { h: "20", w: "20" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
