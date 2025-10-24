import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { css } from "styled-system/css";

import { Button } from "../Button";
import { Menu, MenuItem, MenuSeparator } from "./Menu";

// Mock icon components for menu items
const IconUser = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
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

const IconLogout = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);

const IconEdit = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const IconDelete = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

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

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Whether the menu is disabled",
    },
    trigger: {
      control: false,
      description: "The trigger element that opens the menu",
    },
    children: {
      control: false,
      description: "Menu items to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu trigger={<Button>Open Menu</Button>}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Help</MenuItem>
      <MenuSeparator />
      <MenuItem>Sign out</MenuItem>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu trigger={<Button>User Menu</Button>}>
      <MenuItem icon={IconUser}>Profile</MenuItem>
      <MenuItem icon={IconSettings}>Settings</MenuItem>
      <MenuItem icon={IconEdit}>Edit Profile</MenuItem>
      <MenuSeparator />
      <MenuItem icon={IconLogout}>Sign out</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Menu items can include icons to provide visual context and improve usability.",
      },
    },
  },
};

export const WithEndIcons: Story = {
  render: () => (
    <Menu trigger={<Button>Actions</Button>}>
      <MenuItem endIcon={IconChevronRight}>Edit</MenuItem>
      <MenuItem endIcon={IconChevronRight}>Duplicate</MenuItem>
      <MenuItem endIcon={IconChevronRight}>Share</MenuItem>
      <MenuSeparator />
      <MenuItem icon={IconDelete}>Delete</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Menu items can include end icons to indicate additional actions or navigation.",
      },
    },
  },
};

export const WithSelectedItems: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string | null>("profile");

    return (
      <Menu trigger={<Button>View Options</Button>}>
        <MenuItem
          selected={selectedItem === "profile"}
          onClick={() => setSelectedItem("profile")}
        >
          Profile View
        </MenuItem>
        <MenuItem
          selected={selectedItem === "grid"}
          onClick={() => setSelectedItem("grid")}
        >
          Grid View
        </MenuItem>
        <MenuItem
          selected={selectedItem === "list"}
          onClick={() => setSelectedItem("list")}
        >
          List View
        </MenuItem>
      </Menu>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu items can show selection state with checkmarks and highlighting.",
      },
    },
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menu trigger={<Button>Account</Button>}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem disabled>Premium Features</MenuItem>
      <MenuItem disabled>Advanced Settings</MenuItem>
      <MenuSeparator />
      <MenuItem>Sign out</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Menu items can be disabled to prevent interaction while maintaining visual context.",
      },
    },
  },
};

export const DisabledMenu: Story = {
  render: () => (
    <Menu trigger={<Button disabled>Disabled Menu</Button>} disabled>
      <MenuItem>This won't show</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: "The entire menu can be disabled by setting the disabled prop.",
      },
    },
  },
};

export const ComplexMenu: Story = {
  render: () => (
    <Menu trigger={<Button>File</Button>}>
      <MenuItem icon={IconEdit}>New</MenuItem>
      <MenuItem icon={IconEdit}>Open</MenuItem>
      <MenuItem icon={IconEdit}>Save</MenuItem>
      <MenuSeparator />
      <MenuItem icon={IconEdit}>Import</MenuItem>
      <MenuItem icon={IconEdit}>Export</MenuItem>
      <MenuSeparator />
      <MenuItem icon={IconSettings}>Preferences</MenuItem>
      <MenuSeparator />
      <MenuItem icon={IconLogout}>Exit</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: "A complex menu with multiple sections, icons, and separators.",
      },
    },
  },
};

export const InteractiveMenu: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState<string>("No action taken");

    const handleAction = (action: string) => {
      setLastAction(action);
      alert(`Action: ${action}`);
    };

    return (
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
          alignItems: "center",
        })}
      >
        <Menu trigger={<Button>Actions</Button>}>
          <MenuItem onClick={() => handleAction("Copy")}>Copy</MenuItem>
          <MenuItem onClick={() => handleAction("Cut")}>Cut</MenuItem>
          <MenuItem onClick={() => handleAction("Paste")}>Paste</MenuItem>
          <MenuSeparator />
          <MenuItem onClick={() => handleAction("Delete")} icon={IconDelete}>
            Delete
          </MenuItem>
        </Menu>
        <p
          className={css({
            fontSize: "sm",
            color: "neutrals.blackAlpha.600",
            textAlign: "center",
          })}
        >
          Last action: {lastAction}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu items can have click handlers for interactive functionality.",
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
        <Menu trigger={<Button size="sm">Menu</Button>}>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </Menu>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>With Icons:</span>
        <Menu trigger={<Button size="sm">Menu</Button>}>
          <MenuItem icon={IconUser}>Profile</MenuItem>
          <MenuItem icon={IconSettings}>Settings</MenuItem>
        </Menu>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Selected:</span>
        <Menu trigger={<Button size="sm">Menu</Button>}>
          <MenuItem selected>Selected Item</MenuItem>
          <MenuItem>Regular Item</MenuItem>
        </Menu>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Disabled:</span>
        <Menu
          trigger={
            <Button size="sm" disabled>
              Menu
            </Button>
          }
          disabled
        >
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
        </Menu>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All the different states and variations of Menu displayed together.",
      },
    },
  },
};
