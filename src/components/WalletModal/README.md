# WalletModal Component

A responsive wallet connection modal component for Aptos wallet adapters, styled with Tailwind CSS.

## Features

- **Responsive Design**: Automatically switches between Dialog (desktop) and Drawer (mobile) layouts
- **Multiple Wallet Support**: Displays available, installable, and Aptos Connect wallets
- **Customizable**: Supports wallet sorting options
- **Accessibility**: Follows ARIA best practices with proper focus management
- **Modern Styling**: Fully converted from Panda CSS to Tailwind classes

## Usage

```tsx
import { WalletModal } from '@/components/WalletModal';

function MyComponent() {
  const [showWallet, setShowWallet] = useState(false);

  return (
    <>
      <button onClick={() => setShowWallet(true)}>
        Connect Wallet
      </button>
      
      {showWallet && (
        <WalletModal onClose={() => setShowWallet(false)} />
      )}
    </>
  );
}
```

## Props

### ConnectWalletDialogProps

Extends `WalletSortingOptions` from `@aptos-labs/wallet-adapter-react`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onClose` | `() => void` | Yes | Callback function when modal is closed |

All props from `WalletSortingOptions` are also supported.

## Dependencies

- `@aptos-labs/wallet-adapter-react` - Aptos wallet adapter
- `@okwallet/aptos-wallet-adapter` - OKX wallet adapter
- `@msafe/aptos-wallet-adapter` - MSafe wallet adapter
- Custom hooks: `useIsMobile`
- shadcn/ui components: `Dialog`, `Drawer`

## Styling

The component uses Tailwind CSS classes with custom gradient backgrounds and backdrop blur effects. The design features:

- Gradient overlay with blue/green radial gradient
- Backdrop blur for glassmorphic effect
- Hover effects on wallet cards with shadow animations
- Responsive grid layout for wallet icons
- Smooth transitions and animations

## Wallet Support

The component automatically filters out unsupported wallets and adds additional wallets like OKX and MSafe if not detected.

### Filtered Wallets

- Dev T wallet
- Pontem Wallet
- Trust
- Tokenpocket
- Martian
- Rise

## Mobile Responsiveness

- **Desktop**: Shows as a centered dialog with close button
- **Mobile**: Shows as a bottom drawer without close button (swipe to close)

## Notes

- Component handles SSR properly with mounted state check
- Automatically deduplicates wallet entries
- Includes "Download Nightly Wallet" option when no wallets are available
- Supports expandable "Other wallets" section for installable wallets

