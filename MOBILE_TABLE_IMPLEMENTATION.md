# Mobile Table Implementation

## Overview

Added mobile-responsive table functionality that switches from traditional table layout to card-based layouts on mobile devices, following the Figma design pattern.

## Changes Made

### 1. Enhanced Table Component (`src/components/shadcn/table.tsx`)

Added three new props to the `Table` component:

- **`mobileCardRender`**: Render prop function that accepts an item and index, returns JSX for mobile cards
- **`mobileData`**: Array of data to render in mobile view
- **`forceMobile`**: Optional flag to force mobile view (useful for testing/Storybook)

The component now:
- Detects mobile screen size using `useIsMobile` hook (< 768px breakpoint)
- Conditionally renders either table or card layout
- Maintains sorting functionality in both views
- Preserves TableContext for consistent behavior

### 2. Table Stories (`src/stories/table.stories.tsx`)

Added `MobileView` story demonstrating:
- Custom mobile card renderer with glass-morphism styling
- Card header with avatar and status badge
- Grid layout for data fields
- Proper TypeScript typing for render function

### 3. MobileValidatorsTable Block (`src/blocks/MobileValidatorsTable/`)

Created a comprehensive block showcasing:
- Real-world validators table with mobile optimization
- Card design matching Figma specs:
  - Header with icon, name, and status badge
  - 3-column grid layout for data fields
  - Full-width action button
- Responsive story that switches between table and card views
- Multiple variants (default, borders, alternating)

Files created:
- `block.stories.tsx` - Component and Storybook stories
- `README.md` - Comprehensive documentation

### 4. Documentation Updates

Updated `src/blocks/README.md` to include MobileValidatorsTable block description.

## Design Pattern

The mobile table uses a **render prop pattern** for maximum flexibility:

```tsx
<Table
  mobileData={sortedData}
  mobileCardRender={(item) => {
    const typedItem = item as YourDataType;
    return (
      <div className="mobile-card">
        {/* Custom mobile layout */}
      </div>
    );
  }}
>
  {/* Regular table children */}
</Table>
```

## Why This Approach?

1. **Flexibility**: Since mobile table designs are inconsistent (as noted), users can create any layout they need
2. **Type Safety**: Users can type-cast items in the render function
3. **Separation of Concerns**: Desktop and mobile layouts are separate
4. **Responsive by Default**: Automatically detects screen size
5. **No Breaking Changes**: Existing tables work unchanged

## Mobile Card Design (from Figma)

The Figma design pattern includes:

```
┌─────────────────────────────────────┐
│ [Icon] Name             [Status]    │
├─────────────────────────────────────┤
│ VOLUME    COMMISSION    APY         │
│ 3,979,074    6.0%       8.0%        │
│                                      │
│ PERFORMANCE  UPTIME  TOTAL STAKE    │
│ 100%         100%    🪙 225         │
│                                      │
│ [          STAKE BUTTON          ]  │
└─────────────────────────────────────┘
```

## Design Tokens Used

- **Card Background**: `rgba(0,0,0,0.4)` with `backdrop-blur-sm`
- **Border**: `rgba(255,255,255,0.24)`
- **Label Text**: `rgba(255,255,255,0.48)`, 10px, uppercase, bold
- **Value Text**: `white`, 14px
- **Spacing**: 4-unit grid system (16px)

## Usage Example

```tsx
function MyTable() {
  const sortedData = useSortableData(data);

  return (
    <Table
      variant="borders"
      mobileData={sortedData}
      mobileCardRender={(item) => {
        const row = item as DataType;
        return (
          <div className="rounded-lg bg-[rgba(0,0,0,0.4)] p-4 border border-[rgba(255,255,255,0.24)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Typography>{row.name}</Typography>
              <Badge>{row.status}</Badge>
            </div>
            
            {/* Grid Content */}
            <div className="grid grid-cols-3 gap-4">
              {/* Your fields */}
            </div>
            
            {/* Action */}
            <Button className="w-full mt-4">Action</Button>
          </div>
        );
      }}
    >
      <TableHeader>
        <TableRow>
          <TableHead sortKey="name">Name</TableHead>
          {/* ... */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            {/* ... */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Testing

- ✅ TypeScript compilation passes
- ✅ No linter errors
- ✅ Maintains sorting functionality
- ✅ Responsive behavior works
- ✅ Storybook stories render correctly

## Future Enhancements

Potential improvements:
1. Add animation transitions between table/card views
2. Support for pagination in mobile view
3. Swipe gestures for mobile cards
4. Virtual scrolling for large datasets
5. Mobile-specific filtering UI

## Breaking Changes

None - this is fully backward compatible. Existing tables continue to work without modification.

