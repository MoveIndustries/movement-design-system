# MultiOutlineText Component

A React component that renders text with multiple colored outlines/strokes, creating a bold, eye-catching visual effect. Perfect for headlines, hero text, and branding elements.

## Features

- **Multiple Outlines**: Add multiple colored outlines with customizable widths
- **Responsive**: Automatically adapts font size and stroke width based on screen size
- **Dual Rendering Modes**:
  - SVG mode for plain text (better quality, smoother strokes)
  - CSS mode for mixed content (text + React elements)
- **Fully Customizable**: Control colors, fonts, alignment, and more
- **Tailwind CSS**: Built with Tailwind utilities for easy customization

## Installation

The component is already included in the package. Import it like this:

```tsx
import { MultiOutlineText } from '@/components/MultiOutlineText';
```

## Basic Usage

```tsx
import { MultiOutlineText } from '@/components/MultiOutlineText';

export default function Example() {
  return <MultiOutlineText>MOVEMENT</MultiOutlineText>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Text or elements to display (required) |
| `color` | `string` | `'#81FFBA'` | Fill color of the main text |
| `fontWeight` | `string` | `'900'` | Font weight of the text |
| `lineHeight` | `string` | `'110%'` | Line height of the text |
| `letterSpacing` | `string` | `'1.28px'` | Letter spacing of the text |
| `textAlign` | `string` | `'center'` | Text alignment (`'left'`, `'center'`, `'right'`) |
| `className` | `string` | - | Additional CSS classes |
| `outlines` | `Outline[]` | See below | Array of outline configurations |

### Outline Configuration

Each outline in the `outlines` array has the following structure:

```tsx
{
  color: string;           // Outline color (hex, rgb, etc.)
  width: {
    base: string;          // Width on mobile (e.g., '2px')
    md: string;            // Width on desktop (e.g., '3px')
  };
}
```

**Default outlines:**
```tsx
[
  { color: '#002CD6', width: { base: '2px', md: '3px' } },
  { color: '#ffd935', width: { base: '4px', md: '5px' } },
]
```

## Examples

### Custom Colors

```tsx
<MultiOutlineText
  color="#FF6B6B"
  outlines={[
    { color: '#4ECDC4', width: { base: '2px', md: '3px' } },
    { color: '#FFE66D', width: { base: '4px', md: '5px' } },
  ]}
>
  STAKING
</MultiOutlineText>
```

### Single Outline

```tsx
<MultiOutlineText
  color="#FFFFFF"
  outlines={[
    { color: '#000000', width: { base: '3px', md: '5px' } }
  ]}
>
  SIMPLE
</MultiOutlineText>
```

### Triple Outline

```tsx
<MultiOutlineText
  color="#FF4500"
  outlines={[
    { color: '#000080', width: { base: '2px', md: '3px' } },
    { color: '#FFFFFF', width: { base: '4px', md: '5px' } },
    { color: '#FFD700', width: { base: '6px', md: '7px' } },
  ]}
>
  BOLD
</MultiOutlineText>
```

### Mixed Content

```tsx
<MultiOutlineText color="#81FFBA">
  MOVE <span style={{ color: '#FFD700' }}>NOW</span>
</MultiOutlineText>
```

### Left Aligned

```tsx
<MultiOutlineText textAlign="left" color="#FF69B4">
  LEFT
</MultiOutlineText>
```

### With Custom Class

```tsx
<MultiOutlineText className="my-custom-class">
  STYLED
</MultiOutlineText>
```

## How It Works

### SVG Mode (Text Only)
When `children` is a plain string, the component uses SVG rendering:
- Creates crisp, high-quality text outlines
- Renders strokes from largest to smallest
- Main text is rendered on top with the fill color
- Better for simple text without formatting

### CSS Mode (Mixed Content)
When `children` contains React elements or formatting:
- Uses CSS `WebkitTextStroke` for outlines
- Stacks multiple absolute-positioned layers
- Main text is rendered on top with the fill color
- Supports complex content with mixed styles

## Responsive Behavior

The component automatically adjusts based on screen size:

- **Mobile**: 36px font size, uses `base` outline widths
- **Desktop**: 64px font size, uses `md` outline widths

The breakpoint is determined by the `useIsMobile` hook (768px).

## Font

The component uses the **TWK Everett** font family. Make sure this font is loaded in your project for the best results.

## Accessibility

- The outline layers use `aria-hidden="true"` to prevent screen readers from reading duplicate content
- Only the main text layer is accessible to screen readers

## Performance Considerations

- SVG mode is more performant for simple text
- CSS mode may be slightly heavier with many outlines
- Consider limiting to 2-3 outlines for optimal performance

## Related Components

- [Typography](/docs/components-typography--docs) - For standard text styling
- [DottedBackground](/docs/components-dottedbackground--docs) - For decorative backgrounds

