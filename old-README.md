# Movement Design System

[![npm version](https://img.shields.io/npm/v/@movementlabsxyz/movement-design-system.svg)](https://www.npmjs.com/package/@movementlabsxyz/movement-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready design system built with shadcn/ui components, Radix UI primitives, and Tailwind CSS v4. This library provides a complete set of accessible, customizable React components for building modern web applications.

**Version 1.0** - Stable API, production-ready, comprehensive documentation.

## ✨ Features

- 🎨 **50+ Components** - Buttons, forms, dialogs, navigation, data display, and more
- ♿ **Accessible** - Built on Radix UI primitives with ARIA support
- 🎭 **Customizable** - Full theme customization with CSS variables
- 🌗 **Dark Mode** - Built-in dark mode support
- 📦 **Tree Shakeable** - Only import what you need
- 🔷 **TypeScript** - Full type safety out of the box
- 📚 **Storybook** - Interactive component documentation
- ⚡ **Modern Stack** - Tailwind CSS v4, React 18+, shadcn/ui architecture

## 📦 Installation

### Prerequisites

- React 18+ or 19+
- Tailwind CSS v4
- PostCSS

### Install the Package

Official published package is COMING SOON to NPM. For now, you can install it from the GitHub repository:

have the following in your package.json:
```json
{
  "dependencies": {
    "movement-design-system": "github:movementlabsxyz/movement-design-system"
  }
}
```

then run:
```bash
pnpm install
```

### Setup Tailwind CSS

Ensure you have a standard Tailwind CSS setup with PostCSS. If you haven't set this up yet, follow the [Tailwind CSS v4 installation guide](https://tailwindcss.com/docs/installation).

### Import Styles

Add the following imports to your `global.css` file **in this exact order** (the order is important!):

```css
@import "movement-design-system/component-styles";
@import "movement-design-system/theme";
@import "tailwindcss";
```

> ⚠️ **Important**: The order of these imports matters! Make sure to import the component styles and theme before Tailwind CSS.

## 🚀 Quick Start

```tsx
import { Button, Card, Input } from '@movementlabsxyz/movement-design-system';

function App() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}
```

## 📚 Components & Blocks

### 50+ Production-Ready Components

- **Layout** - Card, Separator, AspectRatio, Resizable, ScrollArea, Sidebar
- **Forms & Inputs** - Input, Textarea, Button, Checkbox, RadioGroup, Select, Switch, Slider, Label, Form, Calendar
- **Navigation** - NavigationMenu, Menubar, DropdownMenu, ContextMenu, Breadcrumb, Tabs, Pagination
- **Feedback** - Alert, AlertDialog, Dialog, Toast, Progress, Spinner, Skeleton
- **Data Display** - Table, Badge, Avatar, Tooltip, HoverCard, Accordion, Collapsible, Chart, Command, Empty
- **Overlays** - Sheet, Drawer, Popover
- **Utilities** - `cn()` function, `useMobile` hook

### Pre-built Blocks

Copy-paste ready patterns built with design system components:

- **StakingBalance** - Glass-morphism card with staking stats and rewards
- **StakeForm** - Complete staking form with validator selection
- **ValidatorsTable** - Comprehensive table with sorting and metrics
- **MobileValidatorsTable** - Responsive table with card layouts
- **PaginatedTable** - Full-featured table with sorting and pagination

Browse the **Blocks** section in [Storybook](https://movement-design-system-docs-git-shadcn-movement-labs.vercel.app/) for live examples with full source code.

## 📖 Documentation

**[View Interactive Storybook →](https://movement-design-system-docs-git-shadcn-movement-labs.vercel.app/)**

Explore live examples, API documentation, and copy-paste ready code snippets for all components and blocks.

### TypeScript Support

Full TypeScript support with IntelliSense and type safety:

```tsx
import { Button, type VariantProps, buttonVariants } from '@movementlabsxyz/movement-design-system';

type ButtonVariants = VariantProps<typeof buttonVariants>;
```

## 🛠️ Development

### Run Locally

```bash
# Clone and install
git clone https://github.com/movementlabsxyz/movement-design-system.git
cd movement-design-system
pnpm install

# Start Storybook
pnpm storybook

# Build library
pnpm build:lib

# Run tests
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss major changes.

- [Report Issues](https://github.com/movementlabsxyz/movement-design-system/issues)
- [View Source](https://github.com/movementlabsxyz/movement-design-system)

## 🔗 Links

- [📚 Documentation](https://movement-design-system-docs-git-shadcn-movement-labs.vercel.app/)
- [📦 npm Package](https://www.npmjs.com/package/@movementlabsxyz/movement-design-system)
- [🐙 GitHub Repository](https://github.com/movementlabsxyz/movement-design-system)
- [🐛 Issue Tracker](https://github.com/movementlabsxyz/movement-design-system/issues)

## 🙏 Built With

- [shadcn/ui](https://ui.shadcn.com/) - Component architecture
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Storybook](https://storybook.js.org/) - Documentation

## 📄 License

[MIT](https://opensource.org/licenses/MIT) © [Movement Network](https://www.movementnetwork.xyz/)
