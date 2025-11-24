# Hamburger Menu Block

A comprehensive mobile navigation component featuring a hamburger menu with slide-down navigation panel, user profile section, and notifications.

## Features

- **Hamburger Menu Icon**: Opens a dropdown navigation panel
- **Logo**: Centered branding in the navbar
- **Notifications**: Bell icon with badge showing unread count
- **User Avatar**: Visual representation of the current user
- **Navigation Tabs**: Multiple navigation items with active state
- **Profile Menu**: Section with user info and menu items
- **Default Styling**: Uses standard DropdownMenu styling from design system
- **Responsive Design**: Optimized for mobile devices

## Components Used

- **DropdownMenu**: Menu panel component from shadcn/ui
- **Avatar**: User profile picture component
- **Badge**: Notification count indicator
- **Button**: Interactive elements
- **Branding**: Movement Labs logo component

## Usage

```tsx
import { HamburgerMenu } from "@movementlabsxyz/movement-design-system";

function App() {
  return (
    <HamburgerMenu
      user={{
        name: "Moveus",
        email: "moveus@movementlabs.xyz",
        avatar: "",
      }}
      navItems={[
        { label: "Dashboard", active: true },
        { label: "Stake" },
        { label: "Rewards" },
        { label: "Governance" },
      ]}
      profileMenuItems={[
        { label: "Your profile" },
        { label: "Settings" },
        { label: "Sign out" },
      ]}
      notificationCount={3}
      onNotificationClick={() => console.log("Notifications")}
    />
  );
}
```

## Props

### HamburgerMenuProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `user` | `{ name: string; email: string; avatar: string }` | `{ name: "Moveus", email: "moveus@movementlabs.xyz", avatar: "" }` | User information |
| `navItems` | `Array<{ label: string; href?: string; onClick?: () => void; active?: boolean }>` | Default tabs | Navigation items |
| `profileMenuItems` | `Array<{ label: string; href?: string; onClick?: () => void }>` | Default items | Profile menu items |
| `notificationCount` | `number` | `1` | Number of unread notifications |
| `onNotificationClick` | `() => void` | - | Callback when notification icon is clicked |
| `className` | `string` | - | Custom class name for the container |

## Examples

### Basic Usage

```tsx
<HamburgerMenu
  notificationCount={5}
/>
```

### With Custom Avatar

```tsx
<HamburgerMenu
  notificationCount={3}
  user={{
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  }}
/>
```

### Custom Navigation Items

```tsx
<HamburgerMenu
  navItems={[
    { label: "Home", active: true, onClick: () => navigate("/") },
    { label: "Validators", onClick: () => navigate("/validators") },
    { label: "Stake", onClick: () => navigate("/stake") },
    { label: "Rewards", onClick: () => navigate("/rewards") },
  ]}
  profileMenuItems={[
    { label: "Profile", onClick: () => navigate("/profile") },
    { label: "Settings", onClick: () => navigate("/settings") },
    { label: "Sign out", onClick: handleSignOut },
  ]}
/>
```

### With Notification Handler

```tsx
<HamburgerMenu
  notificationCount={12}
  onNotificationClick={() => {
    // Open notifications panel
    setNotificationsPanelOpen(true);
  }}
/>
```

### No Notifications

```tsx
<HamburgerMenu
  notificationCount={0}
/>
```

## Design Tokens

The component uses the Movement Design System tokens:

- **Colors**: Uses default DropdownMenu colors from design system
- **Typography**: Standard font weights from design system
- **Spacing**: Consistent padding and gaps using design system scale
- **Border Radius**: Rounded corners on buttons and containers

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant color ratios

## Mobile Optimization

- **Touch Targets**: Optimized for touch interactions
- **Smooth Animation**: Dropdown animation from DropdownMenu component
- **Backdrop**: Dismissible by clicking outside
- **Responsive**: Adapts to different screen sizes with max-width constraint

## Design System Alignment

Based on the Movement Design System Figma design:
- Figma File: `9u0SihIvzLF0bLoQpoiynA`
- Node ID: `3531:4874`
- Breakpoint: Mobile
- Theme: Dark
- Variant: Round

