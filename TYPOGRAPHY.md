# Typography System

This design system includes three custom font families based on the Movement Design System specifications from Figma.

## Font Families

### 1. TWK Everett (Heading Font)
**Usage:** `font-heading`

Used for all headings and titles in the design system. This font provides strong visual hierarchy and is perfect for large display text.

**Available Weights:**
- Bold (700) - Primary heading weight
- Medium (500)
- Regular (400)
- Light (300)

**Sizes:**
- Desktop (lg, xl, 2xl breakpoints): 12px - 80px
- Mobile (md, sm breakpoints): 12px - 64px

### 2. Neue Haas Unica Pro (Body Font)
**Usage:** `font-body`

Used for body text, paragraphs, and general content. This font provides excellent readability and is the default font for the body element.

**Available Weights:**
- Bold (700)
- Medium (500)
- Regular (400)

**Note:** The current implementation includes a single font file. To fully support all weights from the design spec (Heavy, Bold, Medium, Light, Regular), additional font files would need to be added.

**Sizes:**
- 12px (xs) - 32px (3xl)
- Supports uppercase with custom letter spacing

### 3. TWK Everett Mono (Monospace Font)
**Usage:** `font-mono`

Used for code snippets, technical labels, and data displays. Perfect for technical content and numeric data.

**Available Weights:**
- Bold (700)
- Medium (500)
- Regular (400)
- Light (300)

**Sizes:**
- 12px (xs) - 64px (6xl)
- Typically used in uppercase with custom tracking

## Usage Examples

### In React/JSX

```tsx
// Headings
<h1 className="text-5xl font-bold font-heading">
  Main Heading
</h1>

// Body text
<p className="text-base font-body font-medium">
  This is body text with medium weight.
</p>

// Monospace/Code
<code className="font-mono text-sm font-medium">
  const example = "code";
</code>

// Uppercase labels (mono)
<span className="font-mono text-base font-bold uppercase tracking-[0.32px]">
  API Status: Active
</span>
```

### Responsive Typography

```tsx
// Desktop heading (large screens)
<h1 className="text-4xl lg:text-[80px] lg:leading-none font-heading font-bold">
  Responsive Heading
</h1>

// Mobile heading with tracking
<h1 className="text-4xl tracking-[0.7px] md:tracking-normal font-heading font-bold">
  Mobile Optimized
</h1>
```

### Common Patterns

```tsx
// Section heading
<h2 className="text-3xl font-heading font-bold mb-4">
  Section Title
</h2>

// Paragraph
<p className="text-base font-body leading-relaxed">
  Body content with comfortable line height.
</p>

// Label (uppercase, monospace)
<label className="font-mono text-sm font-bold uppercase tracking-[0.56px]">
  Form Label
</label>

// Code block
<pre className="font-mono text-sm font-normal bg-muted p-4 rounded">
  {`code content here`}
</pre>
```

## Design Tokens

### Font Sizes (from Figma)
- **7xl:** 80px
- **6xl:** 64px
- **5xl:** 48px
- **4xl:** 40px
- **3xl:** 32px
- **2xl:** 24px
- **xl:** 20px
- **lg:** 18px
- **md:** 16px
- **sm:** 14px
- **xs:** 12px

### Line Heights
- **none:** 1
- **tight:** 1.2
- **snug:** 1.3
- **normal:** 1.4
- **relaxed:** 1.5

### Letter Spacing (for uppercase)
- 20px text: 2px
- 18px text: 1.8px
- 16px text: 1.6px / 0.64px (mono)
- 14px text: 1.4px / 0.56px (mono)
- 12px text: 1.2px / 0.48px (mono)

## Storybook Examples

View comprehensive examples in Storybook:

```bash
pnpm run storybook
```

Navigate to **Design System > Typography** to see:
- All font families with various weights and sizes
- Heading examples (desktop and mobile)
- Body text variations
- Monospace typography
- Usage examples with code samples

## Technical Implementation

### Font Files
All font files are located in `/src/assets/fonts/`:
- `TWKEverett-*.otf` - Heading font files
- `TWKEverettMono-*.otf` - Monospace font files
- `NeueHaasUnicaPro.otf` - Body font file

### Font Loading
Fonts are loaded via `@font-face` declarations in `/src/fonts.css` with `font-display: swap` for optimal performance.

### Tailwind Configuration
Font families are configured in `theme.css` using CSS variables within the `@theme` directive:

```css
@theme inline {
  /* ... other theme variables ... */
  --font-family-heading: "TWK Everett", sans-serif;
  --font-family-body: "Neue Haas Unica Pro", sans-serif;
  --font-family-mono: "TWK Everett Mono", monospace;
}
```

These are also available in `tailwind.preset.js` for compatibility:

```js
fontFamily: {
  heading: ['"TWK Everett"', 'sans-serif'],
  body: ['"Neue Haas Unica Pro"', 'sans-serif'],
  mono: ['"TWK Everett Mono"', 'monospace'],
}
```

### Default Font
The body element uses `Neue Haas Unica Pro` by default (applied in `theme.css`), so all text will use the body font unless explicitly overridden with `font-heading` or `font-mono` utility classes.

## Future Enhancements

To fully match the design specification, consider:

1. **Neue Haas Unica Pro Weights:** Add separate font files for:
   - Heavy (800)
   - Light (350)
   
2. **Web Font Optimization:** Convert `.otf` files to `.woff2` for better compression and loading performance.

3. **Variable Fonts:** Consider using variable font versions if available for more flexible weight control and smaller file sizes.

4. **Font Subsetting:** Create subsets of fonts with only the characters needed to reduce file size.

