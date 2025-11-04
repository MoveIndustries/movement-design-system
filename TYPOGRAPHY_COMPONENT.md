# Typography Component

A flexible, pre-styled Typography component that provides consistent text styling across your application using the Movement Design System fonts.

## Features

- ✅ **Pre-styled variants** for all common text elements (h1-h6, p, blockquote, code, etc.)
- ✅ **Polymorphic component** - Override the HTML element while keeping the styles
- ✅ **Custom font families** - Automatically applies TWK Everett, Neue Haas Unica Pro, and TWK Everett Mono
- ✅ **Semantic HTML** - Uses appropriate HTML elements by default
- ✅ **Fully customizable** - Extend with Tailwind classes
- ✅ **TypeScript support** - Full type safety out of the box

## Installation

The Typography component is included in the Movement Design System package:

```bash
npm install @movementlabsxyz/movement-design-system
```

## Basic Usage

```tsx
import { Typography } from "@movementlabsxyz/movement-design-system";

function MyComponent() {
  return (
    <>
      <Typography variant="h1">Hello World</Typography>
      <Typography variant="p">This is a paragraph.</Typography>
    </>
  );
}
```

## Variants

### Headings

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
```

**Default styles:**
- Uses `font-heading` (TWK Everett)
- Bold font weight
- Scroll margin for anchor links
- Tight tracking
- Responsive sizes (h1 scales from 4xl to 5xl on large screens)

### Body Text

```tsx
<Typography variant="p">Regular paragraph text</Typography>
<Typography variant="lead">Lead paragraph - larger and muted</Typography>
<Typography variant="large">Large emphasized text</Typography>
<Typography variant="small">Small text for captions</Typography>
<Typography variant="muted">Muted secondary text</Typography>
```

**Default styles:**
- Uses `font-body` (Neue Haas Unica Pro)
- Comfortable line height for readability

### Code & Monospace

```tsx
<Typography variant="code">
  const example = "code block";
</Typography>

<Typography variant="p">
  Text with <Typography variant="inlineCode" as="code">inline code</Typography>
</Typography>

<Typography variant="mono">
  Technical label or data display
</Typography>
```

**Default styles:**
- Uses `font-mono` (TWK Everett Mono)
- Semibold weight for code blocks
- Muted background for better contrast

### Other Variants

```tsx
<Typography variant="blockquote">
  "This is a quote"
</Typography>

<Typography variant="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</Typography>

<Typography variant="label" htmlFor="email">
  Email Address
</Typography>

<Typography variant="uppercase">
  All Caps Text
</Typography>
```

## Polymorphic Component (as prop)

Override the HTML element while keeping the visual styles:

```tsx
// Looks like h2 but renders as h1
<Typography variant="h2" as="h1">
  Main Heading
</Typography>

// Looks like paragraph but renders as div
<Typography variant="p" as="div">
  Styled div content
</Typography>

// Looks like paragraph but renders as span
<Typography variant="p" as="span">
  Inline text
</Typography>
```

## Customization with Tailwind

Extend or override styles using the `className` prop:

```tsx
// Add color
<Typography variant="h1" className="text-primary">
  Colored Heading
</Typography>

// Add spacing
<Typography variant="p" className="mt-4 mb-8">
  Paragraph with custom spacing
</Typography>

// Responsive sizing
<Typography variant="h1" className="text-2xl md:text-4xl lg:text-6xl">
  Custom Responsive Heading
</Typography>

// Multiple customizations
<Typography 
  variant="lead" 
  className="text-center text-primary max-w-2xl mx-auto"
>
  Centered lead text with custom color and width
</Typography>
```

## Real-world Examples

### Article Layout

```tsx
<article className="max-w-3xl mx-auto">
  <Typography variant="h1">Article Title</Typography>
  
  <Typography variant="lead">
    This is the introduction paragraph that hooks the reader.
  </Typography>
  
  <Typography variant="h2">Section Heading</Typography>
  
  <Typography variant="p" affects="removePMargin">
    First paragraph of the section.
  </Typography>
  
  <Typography variant="p" affects="removePMargin">
    Second paragraph with{" "}
    <Typography variant="inlineCode" as="code">
      inline code
    </Typography>
    {" "}example.
  </Typography>
  
  <Typography variant="blockquote">
    "A meaningful quote"
  </Typography>
  
  <Typography variant="code">
    // Code example
    const example = true;
  </Typography>
</article>
```

### Form with Labels

```tsx
<form>
  <div>
    <Typography variant="label" as="label" htmlFor="email">
      Email Address
    </Typography>
    <Typography variant="muted" className="mt-1">
      We'll never share your email
    </Typography>
    <input id="email" type="email" />
  </div>
  
  <div>
    <Typography variant="label" as="label" htmlFor="password">
      Password
    </Typography>
    <input id="password" type="password" />
    <Typography variant="small" className="text-muted-foreground mt-1">
      Must be at least 8 characters
    </Typography>
  </div>
</form>
```

### Card with Mixed Typography

```tsx
<div className="border rounded-lg p-6">
  <Typography variant="h3">Feature Title</Typography>
  <Typography variant="muted" className="mt-2">
    Short description
  </Typography>
  <Typography variant="p" className="mt-4">
    Detailed explanation of the feature with{" "}
    <Typography variant="inlineCode" as="span">
      code examples
    </Typography>
    {" "}inline.
  </Typography>
  <Typography variant="small" className="mt-4 text-muted-foreground">
    Last updated: January 2025
  </Typography>
</div>
```

### Technical Documentation

```tsx
<div>
  <Typography variant="h2">API Reference</Typography>
  
  <Typography variant="mono" className="text-sm font-bold uppercase">
    GET /api/users
  </Typography>
  
  <Typography variant="p" className="mt-4">
    Returns a list of users. Use the{" "}
    <Typography variant="inlineCode" as="code">
      limit
    </Typography>
    {" "}parameter to control pagination.
  </Typography>
  
  <Typography variant="code" className="block mt-4">
    {`fetch('/api/users?limit=10')
  .then(res => res.json())
  .then(data => console.log(data))`}
  </Typography>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "lead" \| "large" \| "small" \| "muted" \| "blockquote" \| "code" \| "list" \| "inlineCode" \| "label" \| "mono" \| "uppercase"` | `"p"` | The visual style variant |
| `as` | `React.ElementType` | varies | Override the HTML element |
| `affects` | `"default" \| "removePMargin" \| "removeMargin"` | `"default"` | Spacing behavior |
| `className` | `string` | - | Additional Tailwind classes |
| `htmlFor` | `string` | - | For label elements |
| ...rest | `HTMLAttributes` | - | All standard HTML attributes |

## Default HTML Elements

Each variant renders a semantic HTML element by default:

- `h1-h6` → `<h1>` through `<h6>`
- `p`, `lead`, `large`, `small`, `muted` → `<p>`
- `blockquote` → `<blockquote>`
- `code`, `inlineCode` → `<code>`
- `list` → `<ul>`
- `label` → `<label>`
- `mono`, `uppercase` → `<p>`

## Font Families

The Typography component automatically applies the appropriate font family:

- **Headings (h1-h6):** TWK Everett (`font-heading`)
- **Body text:** Neue Haas Unica Pro (`font-body`)
- **Code/Monospace:** TWK Everett Mono (`font-mono`)

## Accessibility

The Typography component follows accessibility best practices:

- ✅ Uses semantic HTML elements by default
- ✅ Maintains proper heading hierarchy
- ✅ Includes scroll margin for anchor links
- ✅ Provides sufficient line height for readability
- ✅ Supports all ARIA attributes via spread props

## TypeScript

The component is fully typed and exports the types you need:

```tsx
import { Typography, TypographyProps, typographyVariants } from "@movementlabsxyz/movement-design-system";
import type { VariantProps } from "class-variance-authority";

// Use the component props type
const MyComponent = (props: TypographyProps) => {
  return <Typography {...props} />;
};

// Use the variants helper
type TypographyVariant = VariantProps<typeof typographyVariants>["variant"];
```

## Best Practices

1. **Use semantic HTML:** Let the component choose the right element, or use the `as` prop when needed
2. **Maintain hierarchy:** Don't skip heading levels (h1 → h2 → h3)
3. **Be consistent:** Use the same variants for similar content across your app
4. **Extend thoughtfully:** Use `className` to add styles, not replace them
5. **Consider contrast:** Ensure text has sufficient contrast with its background
6. **Test responsiveness:** Preview your typography on different screen sizes

## Related Components

- [Label](/docs/components-label--docs) - For form labels
- [Text](/docs/design-system-typography--docs) - Typography system documentation

## Examples in Storybook

View all Typography variants and examples:

```bash
pnpm run storybook
```

Navigate to **Components > Typography** to see interactive examples.




