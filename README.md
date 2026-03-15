# Movement Design System

A production-ready React component library built for Movement Network applications. This design system provides accessible, customizable UI components with consistent styling and behavior across all Movement products.

## Tech Stack

- **React 18+** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Component architecture
- **Radix UI** - Accessible primitives
- **Vite** - Build tooling
- **Storybook** - Component documentation

## Installation

### Prerequisites

- React 18+ or 19+
- Tailwind CSS v4
- PostCSS

### Install the Package

```bash
pnpm add @moveindustries/movement-design-system
```

### Install Peer Dependencies

The design system externalizes most UI dependencies. Install the required peer dependencies:

```bash
# Required
pnpm add @phosphor-icons/react lucide-react sonner next-themes

# Radix UI primitives (install those you use)
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-slider @radix-ui/react-avatar @radix-ui/react-accordion @radix-ui/react-popover @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-scroll-area @radix-ui/react-progress @radix-ui/react-slot

# Optional (for specific components)
pnpm add vaul                      # Drawer component
pnpm add recharts                  # Chart components
pnpm add react-day-picker date-fns # Calendar component
pnpm add cmdk                      # Command palette
pnpm add embla-carousel-react      # Carousel
pnpm add input-otp                 # OTP input
pnpm add react-resizable-panels    # Resizable panels
pnpm add react-hook-form @hookform/resolvers zod  # Form management
```

### Import Styles

Add these imports to your `global.css` file in this exact order:

```css
@import "@moveindustries/movement-design-system/component-styles";
@import "@moveindustries/movement-design-system/theme";
@import "tailwindcss";
```

> **Note**: The import order matters. Component styles and theme must come before Tailwind CSS.

### Usage

```tsx
import { Button, Card, Input } from '@moveindustries/movement-design-system';

function App() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}
```

## WalletModal

The design system includes a `WalletModal` component for Aptos wallet connections.

### Setup

Install the wallet adapter:

```bash
pnpm add @moveindustries/wallet-adapter-react
```

### Usage

```tsx
import { WalletModal } from '@moveindustries/movement-design-system';
import { useWallet } from '@moveindustries/wallet-adapter-react';

function ConnectButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { connected } = useWallet();

  if (connected) return <div>Connected</div>;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Connect Wallet</button>
      {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
```

> **Note**: `WalletModal` displays only the wallets configured in your app's `WalletProvider`. It does not auto-add any wallets.

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Build library
pnpm build:lib

# Run tests
pnpm test
```

## Documentation

See the full component documentation in [Storybook](https://movement-design-system-docs.vercel.app/).

## License

MIT
