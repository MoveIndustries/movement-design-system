# Movement Design System

A comprehensive design system built with React, TypeScript, and PandaCSS. This design system provides a complete set of components, design tokens, and styling utilities for building consistent web applications.

## Features

- 🎨 **Complete Design Tokens**: Colors, typography, spacing, and more
- 🧩 **React Components**: Pre-built, accessible components
- 🎯 **PandaCSS Integration**: Built on top of PandaCSS for optimal performance
- 📱 **Responsive Design**: Mobile-first approach with breakpoints
- ♿ **Accessibility**: WCAG compliant components
- 🎭 **Theme Support**: Dark and light theme variants
- 📚 **Storybook**: Interactive component documentation

## Installation

### For a new project with PandaCSS

1. **Install the design system**:
   ```bash
   npm install movement-design-system
   # or
   pnpm add movement-design-system
   # or
   yarn add movement-design-system
   ```

2. **Install PandaCSS** (if not already installed):
   ```bash
   npm install -D @pandacss/dev
   # or
   pnpm add -D @pandacss/dev
   ```

3. **Initialize PandaCSS**:
   ```bash
   npx panda init
   ```

4. **Configure PandaCSS** in your `panda.config.ts`:
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

5. **Generate the CSS**:
   ```bash
   npx panda codegen
   ```

6. **Import the CSS** in your main entry file:
   ```typescript
   import "./styled-system/css";
   ```

## Usage

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

### Using the Movement Preset

If you want to use just the design tokens without the components:

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

The design system includes comprehensive design tokens:

- **Colors**: Semantic color system with light/dark variants
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corner options
- **Shadows**: Elevation and depth
- **Animations**: Standardized animation durations and keyframes

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd movement-design-system
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Generate PandaCSS**:
   ```bash
   pnpm run prepare
   ```

4. **Start Storybook**:
   ```bash
   pnpm run storybook
   ```

5. **Build the library**:
   ```bash
   pnpm run build
   ```

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the library
- `pnpm storybook` - Start Storybook
- `pnpm build-storybook` - Build Storybook
- `pnpm lint` - Run ESLint
- `pnpm prepare` - Generate PandaCSS code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
