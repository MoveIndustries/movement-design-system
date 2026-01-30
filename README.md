# Move Industries Design System

A production-ready React component library built for Move Industries applications. This design system provides accessible, customizable UI components with consistent styling and behavior across all Move Industries products.

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

**Coming soon to npm.**

### Import Styles

Add these imports to your `global.css` file in this exact order:

```css
@import "movement-design-system/component-styles";
@import "movement-design-system/theme";
@import "tailwindcss";
```

> **Note**: The import order matters. Component styles and theme must come before Tailwind CSS.

### Usage

```tsx
import { Button, Card, Input } from 'movement-design-system';

function App() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}
```

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

See the full component documentation in [Storybook](https://movement-design-system-docs-git-shadcn-movement-labs.vercel.app/).

## License

MIT
