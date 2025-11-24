# Branding Component

The Branding component provides access to all Movement Labs branding assets with a clean, type-safe API.

## Usage

```tsx
import { Branding } from '@movementlabsxyz/ui';

// Default (Industries Logomark in Color)
<Branding />

// Industries Lockup Long in Color
<Branding theme="industries" variant="lockup-long" color="color" />

// Industries Logomark in Black
<Branding theme="industries" variant="logomark" color="black" />

// Industries Logomark in White (for dark backgrounds)
<Branding 
  theme="industries" 
  variant="logomark" 
  color="white"
  className="w-24 h-24" 
/>

// Labs Moveus
<Branding theme="labs" variant="moveus" color="color" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'industries' \| 'labs'` | `'industries'` | The branding theme to display |
| `variant` | `'lockup-long' \| 'lockup-short' \| 'logomark' \| 'moveus'` | `'logomark'` | The logo variant to display |
| `color` | `'black' \| 'white' \| 'color'` | `'color'` | The color version to display |
| `className` | `string` | - | Custom class name for styling |

## Available Combinations

### Industries Theme

- **Lockup Long**: Full logo with extended text
  - Available in: `black`, `white`, `color`
  
- **Lockup Short**: Logo with shortened text
  - Available in: `black`, `white`, `color`
  
- **Logomark**: Icon/symbol only
  - Available in: `black`, `white`, `color`

### Labs Theme

- **Moveus**: Labs moveus variant
  - Available in: `color`

## Examples

### Responsive Logo

```tsx
<Branding 
  theme="industries"
  variant="logomark"
  color="color"
  className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24"
/>
```

### Dark Mode Support

```tsx
<div className="bg-white dark:bg-slate-900">
  <Branding 
    theme="industries"
    variant="logomark"
    color="black"
    className="dark:hidden w-24 h-24"
  />
  <Branding 
    theme="industries"
    variant="logomark"
    color="white"
    className="hidden dark:block w-24 h-24"
  />
</div>
```

### Full Width Lockup

```tsx
<Branding 
  theme="industries"
  variant="lockup-long"
  color="color"
  className="w-full max-w-md h-auto"
/>
```

## Best Practices

1. **Use the appropriate color variant** for your background:
   - `black` for light backgrounds
   - `white` for dark backgrounds
   - `color` for maximum brand impact

2. **Consider the variant** based on available space:
   - `logomark` for small spaces or icons
   - `lockup-short` for medium spaces
   - `lockup-long` for maximum brand presence

3. **Maintain aspect ratio** by setting either width or height and letting the other dimension scale automatically

4. **Use appropriate sizing** with Tailwind classes:
   ```tsx
   // Icon/Small: w-8 h-8 to w-16 h-16
   // Medium: w-24 h-24 to w-32 h-32
   // Large: w-48 h-48 to w-64 h-64
   // Full Width: w-full max-w-{size} h-auto
   ```

## Notes

- All SVG assets are imported as React components for optimal bundle size
- The component will warn in console if an invalid combination is requested
- All standard SVG props are supported and forwarded to the underlying SVG element

