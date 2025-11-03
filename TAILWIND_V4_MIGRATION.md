# Tailwind CSS v4 Migration Summary

This document outlines the migration from Tailwind CSS v3 JavaScript configuration to Tailwind CSS v4 CSS-first configuration.

## What Changed

### ✅ Migrated to CSS Configuration (`src/theme.css`)

All Tailwind configuration has been moved from JavaScript (`tailwind.preset.js`) to CSS using the `@theme` directive. This includes:

#### **Brand Colors**
- `moveus-marigold` (50-900 scale)
- `guild-green` (50-900 scale)
- `byzantine-blue` (50-900 scale)
- `protocol-pink` (50-900 scale)
- `oracle-orange` (50-900 scale)

#### **Neutral Colors**
- `neutrals-white` and `neutrals-black`
- `neutrals-white-alpha` (50-900 scale with alpha transparency)
- `neutrals-black-alpha` (50-900 scale with alpha transparency)

#### **Semantic Colors**
All semantic colors remain available as CSS variables:
- `background`, `foreground`
- `primary`, `secondary`, `accent`, `destructive`
- `info`, `success`, `warning`, `error`
- `card`, `popover`, `sidebar`
- `muted`, `border`, `input`, `ring`
- `chart-1` through `chart-5`

#### **Typography**
- `font-heading`: TWK Everett
- `font-body`: Neue Haas Unica Pro
- `font-mono`: TWK Everett Mono

#### **Opacity Scale**
Custom opacity values: `1`, `2`, `3`, `4`, `5`, `8`, `9`, `10`

#### **Border Radius**
- `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`

#### **Container Configuration**
- Centered by default
- 2rem padding
- 2xl breakpoint at 1400px

#### **Animations**
- `accordion-down` and `accordion-up` keyframes
- Animation utilities automatically generated

### ✅ Dark Mode

Dark mode is now configured using the `@custom-variant` directive:
```css
@custom-variant dark (&:is(.dark *));
```

This maintains the same behavior as v3 where adding the `.dark` class enables dark mode.

### ✅ Simplified Configuration Files

#### `tailwind.preset.js`
Reduced from ~350 lines to ~15 lines. Now serves as a compatibility stub with all configuration in CSS.

#### `tailwind.config.js`
Simplified to use automatic content detection. The `content` array is no longer needed in v4.

#### `vite.config.ts`
Already configured with `@tailwindcss/vite` plugin - no changes needed.

## Usage

### Using Brand Colors

```tsx
// All brand colors are available with their full scales
<div className="bg-guild-green-400 text-byzantine-blue-600">
  <span className="text-protocol-pink-300">Hello</span>
</div>
```

### Using Semantic Colors

```tsx
// Semantic colors work the same as before
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

<div className="bg-card text-card-foreground border-border">
  Card content
</div>
```

### Using Custom Fonts

```tsx
// Font families are available as utilities
<h1 className="font-heading">Heading Text</h1>
<p className="font-body">Body Text</p>
<code className="font-mono">Code Text</code>
```

### Using Opacity

```tsx
// Custom opacity scale
<div className="opacity-1">10% opacity</div>
<div className="opacity-5">50% opacity</div>
<div className="opacity-9">90% opacity</div>
```

### Using Animations

```tsx
// Animations work the same as before
<div className="animate-accordion-down">
  Accordion content
</div>
```

### Dark Mode

```tsx
// Dark mode usage remains the same
<div className="bg-background dark:bg-background text-foreground dark:text-foreground">
  Content that adapts to dark mode
</div>
```

## Benefits of v4

1. **Performance**: 3.5x faster full builds, 8x faster incremental builds
2. **Zero Configuration**: Automatic content detection, no need to configure file paths
3. **CSS-First**: Customize directly in CSS instead of JavaScript
4. **Modern CSS**: Uses cascade layers, registered custom properties, and `color-mix()`
5. **Smaller Bundle**: Fewer dependencies and simpler configuration

## Files Modified

- ✅ `src/theme.css` - All theme configuration migrated to CSS
- ✅ `tailwind.preset.js` - Simplified to empty preset
- ✅ `tailwind.config.js` - Removed content array (automatic detection)
- ℹ️ `src/index.css` - No changes needed (already using `@import "tailwindcss"`)
- ℹ️ `vite.config.ts` - No changes needed (already using `@tailwindcss/vite`)

## Breaking Changes

None! The migration maintains full backward compatibility. All existing class names and utilities continue to work exactly as before.

## Reference

- [Tailwind CSS v4 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

---

**Migration Date**: November 3, 2025  
**Tailwind Version**: v4.1.16

