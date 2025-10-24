# Installation Guide

## Quick Start

### 1. Install the Design System

```bash
npm install movement-design-system
# or
pnpm add movement-design-system
# or
yarn add movement-design-system
```

### 2. Install PandaCSS (if not already installed)

```bash
npm install -D @pandacss/dev
# or
pnpm add -D @pandacss/dev
```

### 3. Initialize PandaCSS

```bash
npx panda init
```

### 4. Configure PandaCSS

Update your `panda.config.ts`:

```typescript
import { defineConfig } from "@pandacss/dev";
import { movementPreset } from "movement-design-system/preset";

export default defineConfig({
  presets: [movementPreset],
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
});
```

### 5. Generate CSS

```bash
npx panda codegen
```

### 6. Import CSS

In your main entry file (e.g., `main.tsx` or `App.tsx`):

```typescript
import "./styled-system/css";
```

## Usage Examples

### Using Components

```tsx
import { Button, Card } from "movement-design-system";

function App() {
  return (
    <div>
      <Button variant="filled" color="yellow" size="md">
        Click me
      </Button>
      
      <Card>
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </Card>
    </div>
  );
}
```

### Using Design Tokens

```tsx
import { css } from "styled-system/css";

const MyComponent = () => (
  <div
    className={css({
      bg: "moveus-marigold.400",
      color: "neutrals.black",
      p: "4",
      rounded: "md",
      fontSize: "lg",
    })}
  >
    Styled with design tokens
  </div>
);
```

### Using Just the Preset

If you only want the design tokens without components:

```typescript
// panda.config.ts
import { defineConfig } from "@pandacss/dev";
import { movementPreset } from "movement-design-system/preset";

export default defineConfig({
  presets: [movementPreset],
  // ... other config
});
```

## Available Components

- **Button**: Interactive button with multiple variants, sizes, and colors
- **Card**: Container component for content organization

## Design Tokens

The design system includes:

- **Colors**: Semantic color system with light/dark variants
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corner options
- **Shadows**: Elevation and depth
- **Animations**: Standardized animation durations and keyframes

## Troubleshooting

### Common Issues

1. **"Cannot find module 'styled-system/css'"**
   - Make sure you've run `npx panda codegen` after configuration
   - Check that your `panda.config.ts` is properly configured

2. **Components not styling correctly**
   - Ensure you've imported the CSS: `import "./styled-system/css"`
   - Verify the movement preset is included in your PandaCSS config

3. **TypeScript errors**
   - Make sure you're using TypeScript 5.0+ with `moduleResolution: "bundler"`

### Support

For issues or questions, please check the main README or create an issue in the repository.
