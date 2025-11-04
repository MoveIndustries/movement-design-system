# Icons

The Movement Design System provides direct access to all [Phosphor Icons](https://github.com/phosphor-icons/react) - a flexible icon family with 1,200+ icons.

## Features

- **1,200+ Icons**: Complete Phosphor icon library
- **6 Weights**: thin, light, regular, bold, fill, duotone
- **Flexible Sizing**: Any size with the `size` prop
- **Color Support**: Any CSS color value
- **TypeScript**: Full type safety
- **Custom Crypto Icons**: Additional cryptocurrency icons

## Usage

### Basic Usage

```tsx
import { HeartIcon, StarIcon, UserIcon, SettingsIcon } from "@movementlabsxyz/movement-design-system";

// Basic usage
<HeartIcon size={24} color="red" />

// Different weights
<StarIcon weight="fill" size={32} />
<StarIcon weight="duotone" size={24} />

// Different colors
<UserIcon color="blue" size={20} />
<SettingsIcon color="gray" size={24} />
```

### Available Icons

All Phosphor icons are available. Common ones include:

- **Interface**: `HeartIcon`, `StarIcon`, `UserIcon`, `SettingsIcon`, `HomeIcon`, `SearchIcon`, `MenuIcon`, `CloseIcon`
- **Actions**: `PlayIcon`, `PauseIcon`, `StopIcon`, `DownloadIcon`, `UploadIcon`, `ShareIcon`, `CopyIcon`
- **Navigation**: `ArrowLeftIcon`, `ArrowRightIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`
- **Communication**: `ChatIcon`, `MessageIcon`, `PhoneIcon`, `MailIcon`, `NotificationIcon`
- **Media**: `ImageIcon`, `VideoIcon`, `MusicIcon`, `CameraIcon`, `MicrophoneIcon`
- **And 1,000+ more...**

### Icon Weights

Phosphor icons support 6 different weights:

```tsx
<HeartIcon weight="thin" size={24} />      // Very light stroke
<HeartIcon weight="light" size={24} />     // Light stroke
<HeartIcon weight="regular" size={24} />   // Normal stroke (default)
<HeartIcon weight="bold" size={24} />      // Bold stroke
<HeartIcon weight="fill" size={24} />      // Filled icon
<HeartIcon weight="duotone" size={24} />   // Two-tone icon
```

### Sizing

Icons can be sized to any dimension:

```tsx
<HeartIcon size={12} />   // 12px
<HeartIcon size={16} />   // 16px
<HeartIcon size={20} />   // 20px
<HeartIcon size={24} />   // 24px
<HeartIcon size={32} />   // 32px
<HeartIcon size={48} />   // 48px
<HeartIcon size={64} />   // 64px
```

### Colors

Icons accept any CSS color value:

```tsx
<HeartIcon color="red" />
<HeartIcon color="#ff0000" />
<HeartIcon color="rgb(255, 0, 0)" />
<HeartIcon color="var(--color-primary)" />
<HeartIcon color="currentColor" />  // Inherits from parent
```

### Custom Crypto Icons

Additional cryptocurrency icons are available as individual components:

```tsx
import { 
  BitcoinIcon, 
  EthereumIcon, 
  SolanaIcon, 
  USDCIcon, 
  USDTIcon, 
  MoveIcon 
} from "@movementlabsxyz/movement-design-system";

// Use crypto icons as React components
<BitcoinIcon size={24} color="orange" />
<EthereumIcon size={24} color="blue" />
<SolanaIcon size={24} color="purple" />
<USDCIcon size={24} color="green" />
<USDTIcon size={24} color="teal" />
<MoveIcon size={24} color="red" />
```

Available crypto icons:
- `BitcoinIcon` - Bitcoin
- `EthereumIcon` - Ethereum
- `SolanaIcon` - Solana
- `USDCIcon` - USD Coin
- `USDTIcon` - Tether
- `MoveIcon` - Movement Labs
- `MovementIcon` - Movement Labs (alternative)

## Examples

### Common UI Patterns

```tsx
// Button with icon
<button>
  <HeartIcon size={16} />
  Like
</button>

// Navigation
<nav>
  <HomeIcon size={20} />
  <UserIcon size={20} />
  <SettingsIcon size={20} />
</nav>

// Status indicators
<CheckCircleIcon size={16} color="green" />
<XCircleIcon size={16} color="red" />
<WarningCircleIcon size={16} color="orange" />
```

### Icon Combinations

```tsx
// Social media icons
<div>
  <TwitterLogoIcon size={24} />
  <FacebookLogoIcon size={24} />
  <InstagramLogoIcon size={24} />
</div>

// File types
<div>
  <FilePdfIcon size={24} />
  <FileImageIcon size={24} />
  <FileVideoIcon size={24} />
</div>
```

### Animated Icons

```tsx
// Icons can be animated with CSS
<HeartIcon 
  size={24} 
  style={{ 
    animation: "pulse 2s infinite",
    transform: "scale(1.1)" 
  }} 
/>
```

## Props

All Phosphor icons accept these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number \| string` | `24` | Size of the icon |
| `weight` | `"thin" \| "light" \| "regular" \| "bold" \| "fill" \| "duotone"` | `"regular"` | Weight of the icon |
| `color` | `string` | `"currentColor"` | Color of the icon |
| `mirrored` | `boolean` | `false` | Whether to mirror the icon |
| `className` | `string` | - | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

## Performance

- **Tree Shaking**: Only import the icons you use
- **Bundle Size**: Each icon is ~1-2KB
- **Optimized**: Icons are optimized SVGs
- **No Runtime**: Icons are compiled at build time

## Migration from Other Icon Libraries

### From React Icons
```tsx
// Before
import { FaHeart } from "react-icons/fa";
<FaHeart size={24} />

// After
import { HeartIcon } from "@movementlabsxyz/movement-design-system";
<HeartIcon size={24} />
```

### From Heroicons
```tsx
// Before
import { HeartIcon } from "@heroicons/react/24/outline";
<HeartIcon className="h-6 w-6" />

// After
import { HeartIcon } from "@movementlabsxyz/movement-design-system";
<HeartIcon size={24} />
```

## Resources

- [Phosphor Icons Website](https://phosphoricons.com/)
- [Phosphor Icons GitHub](https://github.com/phosphor-icons/react)
- [Icon Search](https://phosphoricons.com/)
- [Icon Gallery](https://phosphoricons.com/)