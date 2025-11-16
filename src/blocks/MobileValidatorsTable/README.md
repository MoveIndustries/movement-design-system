# MobileValidatorsTable Block

A mobile-optimized validators table demonstrating responsive design with card-based layouts for mobile devices.

## Features

- **Responsive Design**: Automatically switches between table (desktop) and card view (mobile < 768px)
- **Custom Mobile Layouts**: Flexible render prop pattern for customizable mobile card designs
- **Sorting**: Maintains sorting functionality in both desktop and mobile views
- **Card-Based Design**: Mobile cards with header, status badge, and grid layout
- **Glass-morphism Styling**: Modern backdrop blur effects and semi-transparent backgrounds

## Usage

### Basic Implementation

```tsx
import { Table } from "@/components/shadcn/table";

<Table
  mobileData={data}
  mobileCardRender={(item) => {
    const typedItem = item as YourDataType;
    return (
      <div className="rounded-lg bg-[rgba(0,0,0,0.4)] p-4 border border-[rgba(255,255,255,0.24)]">
        {/* Your custom mobile card layout */}
      </div>
    );
  }}
>
  {/* Regular table children for desktop view */}
</Table>
```

### Props

- `mobileData` - Array of data items to render in mobile view
- `mobileCardRender` - Render function that takes an item and index, returns JSX for the mobile card
- `forceMobile` - (Optional) Force mobile view regardless of screen size (useful for Storybook)

## Mobile Card Design Pattern

Based on the Figma design, mobile table cards typically include:

1. **Card Header**
   - Icon/Avatar
   - Title/Name
   - Status Badge

2. **Card Content (Grid Layout)**
   - 3-column grid for data fields
   - Label (uppercase, muted color)
   - Value (white, prominent)
   - Icons where appropriate (e.g., token icons)

3. **Card Actions**
   - Full-width button at bottom

## Example Mobile Card Structure

```tsx
mobileCardRender={(validator: Validator) => (
  <div className="rounded-lg bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.24)]">
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.24)]">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-purple-500">
          {/* Icon */}
        </div>
        <Typography>{validator.name}</Typography>
      </div>
      <Badge variant="outline">{validator.status}</Badge>
    </div>

    {/* Content Grid */}
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-[10px] uppercase text-[rgba(255,255,255,0.48)]">
            Label
          </div>
          <div className="text-white text-sm">
            Value
          </div>
        </div>
        {/* More columns... */}
      </div>
      
      {/* Action Button */}
      <Button className="w-full">Action</Button>
    </div>
  </div>
)}
```

## Design Tokens

### Colors
- Card Background: `rgba(0,0,0,0.4)` with `backdrop-blur-sm`
- Border: `rgba(255,255,255,0.24)`
- Label Text: `rgba(255,255,255,0.48)`
- Value Text: `white`

### Typography
- Labels: `text-[10px] font-bold tracking-[1.2px] uppercase`
- Values: `text-sm font-normal`

### Spacing
- Card Padding: `p-4`
- Grid Gap: `gap-4`
- Vertical Spacing: `space-y-4`

## Sorting in Mobile View

The mobile cards automatically respect the table's sorting state through the `useSortableData` hook:

```tsx
function YourTableComponent() {
  const sortedData = useSortableData(rawData);

  return (
    <Table
      mobileData={sortedData}  // Use sorted data
      mobileCardRender={(item) => (/* ... */)}
    >
      <TableHeader>
        <TableRow>
          <TableHead sortKey="name">Name</TableHead>
          {/* Clicking headers updates both desktop table and mobile cards */}
        </TableRow>
      </TableHeader>
      {/* ... */}
    </Table>
  );
}
```

## Customization Notes

Since mobile table designs vary between applications, the render prop pattern allows complete customization:

- **Layout**: Choose between grid, flex, or stacked layouts
- **Fields**: Show/hide different fields on mobile
- **Styling**: Apply custom styling to match your design system
- **Actions**: Add custom buttons, links, or interactive elements

## Responsive Behavior

The table automatically detects screen size using the `useIsMobile` hook (breakpoint: 768px):

- **Desktop (≥ 768px)**: Traditional table layout
- **Mobile (< 768px)**: Card-based layout (when `mobileCardRender` is provided)

## Performance Considerations

- Mobile cards are rendered on-demand based on screen size
- Sorting operations work on the data array, not the rendered components
- Use React.memo for mobile card components if rendering many items

## Related Components

- `Table` - Base table component
- `useSortableData` - Hook for sorting data
- `useIsMobile` - Hook for responsive behavior
- `Card` - Card container component
- `Badge` - Status badge component

