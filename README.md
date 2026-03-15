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

```bash
pnpm add @phosphor-icons/react lucide-react sonner next-themes

# Radix UI primitives (install those you use)
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-slider @radix-ui/react-avatar @radix-ui/react-accordion @radix-ui/react-popover @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-scroll-area @radix-ui/react-progress @radix-ui/react-slot
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

## Optional Components

Some components are available via separate entry points. Carousel, Forms, and Drawer have their dependencies bundled — no extra installs required.

```tsx
// Carousel (embla-carousel-react bundled)
import { Carousel, CarouselContent, CarouselItem } from '@moveindustries/movement-design-system/carousel';

// Forms (react-hook-form bundled)
import { Form, FormField, FormItem, FormLabel } from '@moveindustries/movement-design-system/forms';

// Drawer (vaul bundled)
import { Drawer, DrawerContent, DrawerTrigger } from '@moveindustries/movement-design-system/drawer';
```

### WalletModal

WalletModal requires the wallet adapter as a peer dependency (for shared context):

```bash
pnpm add @moveindustries/wallet-adapter-react
```

```tsx
import { WalletModal } from '@moveindustries/movement-design-system/wallet';
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

> **Note**: `WalletModal` displays only the wallets configured in your app's `WalletProvider`.

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
