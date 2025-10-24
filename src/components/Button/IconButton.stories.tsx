import type { Meta, StoryObj } from "@storybook/react";
import { css } from "styled-system/css";

import { IconButton } from "./IconButton";

// Mock icon components for demonstration
const MockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
  </svg>
);

const MockHeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const MockSettingsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Components/Button/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the icon button",
    },
    variant: {
      control: "select",
      options: ["filled", "outlined", "text", "ghost"],
      description: "The variant style of the button",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "neutral",
        "danger",
        "success",
        "warning",
      ],
      description: "The color theme of the button",
    },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "The border radius of the button",
    },
    disabled: {
      control: "boolean",
      description: "When true, the button will be disabled",
    },
    children: {
      control: false,
      description: "The icon content to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <MockIcon />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton size="sm">
        <MockIcon />
      </IconButton>
      <IconButton size="md">
        <MockIcon />
      </IconButton>
      <IconButton size="lg">
        <MockIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton comes in three sizes: small (sm), medium (md), and large (lg).",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton variant="filled">
        <MockIcon />
      </IconButton>
      <IconButton variant="outlined">
        <MockIcon />
      </IconButton>
      <IconButton variant="text">
        <MockIcon />
      </IconButton>
      <IconButton variant="ghost">
        <MockIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton supports four variants: filled, outlined, text, and ghost.",
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton color="primary">
        <MockIcon />
      </IconButton>
      <IconButton color="secondary">
        <MockIcon />
      </IconButton>
      <IconButton color="neutral">
        <MockIcon />
      </IconButton>
      <IconButton color="danger">
        <MockIcon />
      </IconButton>
      <IconButton color="success">
        <MockIcon />
      </IconButton>
      <IconButton color="warning">
        <MockIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton supports six color themes: primary, secondary, neutral, danger, success, and warning.",
      },
    },
  },
};

export const AllRadius: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton radius="sm">
        <MockIcon />
      </IconButton>
      <IconButton radius="md">
        <MockIcon />
      </IconButton>
      <IconButton radius="lg">
        <MockIcon />
      </IconButton>
      <IconButton radius="full">
        <MockIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton supports four border radius options: small (sm), medium (md), large (lg), and full (circular).",
      },
    },
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton>
        <MockIcon />
      </IconButton>
      <IconButton>
        <MockHeartIcon />
      </IconButton>
      <IconButton>
        <MockSettingsIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton can display any icon component that accepts a className prop.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    children: <MockIcon />,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled IconButton shows reduced opacity and prevents interaction.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton
        onClick={() => alert("Star clicked!")}
        ariaLabel="Add to favorites"
      >
        <MockIcon />
      </IconButton>
      <IconButton
        onClick={() => alert("Heart clicked!")}
        ariaLabel="Like this item"
      >
        <MockHeartIcon />
      </IconButton>
      <IconButton
        onClick={() => alert("Settings clicked!")}
        ariaLabel="Open settings"
      >
        <MockSettingsIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton supports click handlers and accessibility labels. Try clicking the buttons to see the interaction.",
      },
    },
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "4",
        flexWrap: "wrap",
      })}
    >
      <IconButton
        className={css({
          bg: "moveus-marigold.100",
          border: "2px solid",
          borderColor: "moveus-marigold.400",
        })}
      >
        <MockIcon />
      </IconButton>
      <IconButton
        className={css({
          bg: "byzantine-blue.100",
          border: "2px solid",
          borderColor: "byzantine-blue.400",
        })}
      >
        <MockHeartIcon />
      </IconButton>
      <IconButton
        className={css({
          bg: "protocol-pink.100",
          border: "2px solid",
          borderColor: "protocol-pink.400",
        })}
      >
        <MockSettingsIcon />
      </IconButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconButton can be customized with additional CSS classes for unique styling needs.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "6",
        alignItems: "flex-start",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Default:</span>
        <IconButton>
          <MockIcon />
        </IconButton>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Disabled:</span>
        <IconButton disabled>
          <MockIcon />
        </IconButton>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Large:</span>
        <IconButton size="lg">
          <MockIcon />
        </IconButton>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Outlined:</span>
        <IconButton variant="outlined">
          <MockIcon />
        </IconButton>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All the different states and variations of IconButton displayed together.",
      },
    },
  },
};
