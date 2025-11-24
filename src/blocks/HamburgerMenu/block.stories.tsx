import type { StoryObj } from "@storybook/react-vite";
import { HamburgerMenu } from "./HamburgerMenu";

/**
 * HamburgerMenu Block
 *
 * A comprehensive mobile navigation component featuring a hamburger menu
 * with slide-down navigation panel, user profile section, and notifications.
 *
 * Uses design system components: Sheet, Avatar, Badge, Button, and Branding.
 */
const meta = {
  title: "Blocks/Hamburger Menu",
  component: HamburgerMenu,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    notificationCount: {
      control: { type: "number", min: 0, max: 99 },
      description: "Number of unread notifications",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hamburger menu with all features
 */
export const Default: Story = {
  args: {
    user: {
      name: "Moveus",
      email: "moveus@movementlabs.xyz",
      avatar: "",
    },
    navItems: [
      { label: "Tab 1", active: true },
      { label: "Tab 2" },
      { label: "Tab 3" },
      { label: "Tab 4" },
    ],
    profileMenuItems: [
      { label: "Your profile" },
      { label: "Settings" },
      { label: "Sign out" },
    ],
    notificationCount: 1,
    onNotificationClick: () => console.log("Notification clicked"),
  },
};

/**
 * With multiple navigation items
 */
export const MultipleNavItems: Story = {
  args: {
    user: {
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "",
    },
    navItems: [
      { label: "Dashboard", active: true, onClick: () => console.log("Dashboard") },
      { label: "Stake", onClick: () => console.log("Stake") },
      { label: "Portfolio", onClick: () => console.log("Portfolio") },
      { label: "Rewards", onClick: () => console.log("Rewards") },
      { label: "Governance", onClick: () => console.log("Governance") },
    ],
    profileMenuItems: [
      { label: "Your profile", onClick: () => console.log("Profile") },
      { label: "Settings", onClick: () => console.log("Settings") },
      { label: "Help & Support", onClick: () => console.log("Help") },
      { label: "Sign out", onClick: () => console.log("Sign out") },
    ],
    notificationCount: 3,
    onNotificationClick: () => console.log("Notifications opened"),
  },
};


/**
 * No notifications variant
 */
export const NoNotifications: Story = {
  args: {
    user: {
      name: "Carol White",
      email: "carol@movement.xyz",
      avatar: "",
    },
    navItems: [
      { label: "Validators", active: true },
      { label: "Stake" },
      { label: "Rewards" },
    ],
    profileMenuItems: [
      { label: "Profile" },
      { label: "Settings" },
      { label: "Sign out" },
    ],
    notificationCount: 0,
  },
};

/**
 * With custom user avatar
 */
export const WithAvatar: Story = {
  args: {
    user: {
      name: "David Brown",
      email: "david@movementlabs.xyz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    navItems: [
      { label: "Dashboard", active: true },
      { label: "Analytics" },
      { label: "Reports" },
      { label: "Settings" },
    ],
    profileMenuItems: [
      { label: "View Profile" },
      { label: "Account Settings" },
      { label: "Privacy" },
      { label: "Logout" },
    ],
    notificationCount: 12,
    onNotificationClick: () => alert("You have 12 new notifications!"),
  },
};

/**
 * Minimal navigation items
 */
export const Minimal: Story = {
  args: {
    user: {
      name: "Eve Martinez",
      email: "eve@example.com",
      avatar: "",
    },
    navItems: [
      { label: "Home", active: true },
      { label: "About" },
    ],
    profileMenuItems: [
      { label: "Settings" },
      { label: "Sign out" },
    ],
    notificationCount: 0,
  },
};

/**
 * Mobile viewport demonstration
 */
export const MobileView: Story = {
  args: {
    user: {
      name: "Moveus",
      email: "moveus@movementlabs.xyz",
      avatar: "",
    },
    navItems: [
      { label: "Stake", active: true },
      { label: "Validators" },
      { label: "Rewards" },
      { label: "Governance" },
    ],
    profileMenuItems: [
      { label: "Your profile" },
      { label: "Settings" },
      { label: "Sign out" },
    ],
    notificationCount: 7,
    onNotificationClick: () => console.log("Notification clicked"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

