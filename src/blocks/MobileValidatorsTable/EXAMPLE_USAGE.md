# Mobile Table - Example Usage

## Quick Start

### 1. Basic Mobile Table

```tsx
import { Table } from "@/components/shadcn/table";

<Table
  mobileData={data}
  mobileCardRender={(item) => {
    const row = item as YourDataType;
    return (
      <div className="rounded-lg bg-[rgba(0,0,0,0.4)] p-4 border border-[rgba(255,255,255,0.24)]">
        <h3>{row.title}</h3>
        <p>{row.description}</p>
      </div>
    );
  }}
>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>
```

### 2. With Sorting

```tsx
import { useSortableData } from "@/components/shadcn/table-hooks";

function MyTable() {
  const sortedData = useSortableData(rawData);

  return (
    <Table
      mobileData={sortedData}  // Pass sorted data
      mobileCardRender={(item) => (/* card layout */)}
    >
      <TableHeader>
        <TableRow>
          <TableHead sortKey="name">Name</TableHead>
          <TableHead sortKey="value">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 3. Force Mobile View (for Testing)

```tsx
<Table
  forceMobile={true}  // Always show mobile view
  mobileData={data}
  mobileCardRender={(item) => (/* card layout */)}
>
  {/* ... */}
</Table>
```

## Card Design Template

Here's a template based on the Figma design pattern:

```tsx
mobileCardRender={(item) => {
  const data = item as YourDataType;
  return (
    <div className="rounded-lg bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.24)] overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.24)]">
        <div className="flex items-center gap-3">
          {/* Icon/Avatar */}
          <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            {data.icon}
          </div>
          
          {/* Title */}
          <Typography variant="body" className="text-white font-semibold">
            {data.name}
          </Typography>
        </div>
        
        {/* Status Badge */}
        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
          {data.status}
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* First Row - 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
              Label 1
            </div>
            <div className="text-white text-sm font-normal leading-[1.4]">
              {data.value1}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
              Label 2
            </div>
            <div className="text-white text-sm font-normal leading-[1.4]">
              {data.value2}
            </div>
          </div>
          
          <div>
            <div className="text-[10px] leading-[1.3] font-bold tracking-[1.2px] uppercase text-[rgba(255,255,255,0.48)] mb-1.5">
              Label 3
            </div>
            <div className="text-white text-sm font-normal leading-[1.4]">
              {data.value3}
            </div>
          </div>
        </div>

        {/* Second Row - 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          {/* Same structure... */}
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="default"
          className="w-full border-guild-green-300 text-guild-green-300 hover:bg-guild-green-300/10 rounded-lg gap-2"
        >
          <Icon className="size-5" />
          <span className="uppercase text-sm font-semibold">Action</span>
        </Button>
      </div>
    </div>
  );
}}
```

## Common Patterns

### With Icons

```tsx
<div className="flex items-center gap-2">
  <MoveIcon className="size-4 shrink-0" />
  <span className="font-mono">{value}</span>
</div>
```

### With Progress Bars

```tsx
<div className="space-y-2">
  <div className="text-[10px] uppercase text-[rgba(255,255,255,0.48)]">
    Performance
  </div>
  <div className="flex items-center gap-3">
    <Progress
      value={performance}
      className="h-4 flex-1 bg-white/10 [&>div]:bg-guild-green-300"
    />
    <span className="text-white text-xs min-w-[35px]">
      {performance}%
    </span>
  </div>
</div>
```

### With Conditional Styling

```tsx
<div
  className={cn(
    "px-2 py-1 rounded text-xs font-medium",
    status === "active"
      ? "bg-green-500/20 text-green-400"
      : "bg-gray-500/20 text-gray-400"
  )}
>
  {status}
</div>
```

## Layout Options

### 2-Column Grid

```tsx
<div className="grid grid-cols-2 gap-4">
  <Field label="Field 1" value={data.field1} />
  <Field label="Field 2" value={data.field2} />
</div>
```

### 3-Column Grid (Recommended)

```tsx
<div className="grid grid-cols-3 gap-4">
  <Field label="Field 1" value={data.field1} />
  <Field label="Field 2" value={data.field2} />
  <Field label="Field 3" value={data.field3} />
</div>
```

### Stacked Layout

```tsx
<div className="space-y-3">
  <Field label="Field 1" value={data.field1} />
  <Field label="Field 2" value={data.field2} />
  <Field label="Field 3" value={data.field3} />
</div>
```

## Responsive Testing

To test your mobile table:

1. **In Development**:
   - Resize browser to < 768px width
   - Use browser DevTools mobile emulation

2. **In Storybook**:
   - Use `forceMobile={true}` prop
   - Or resize Storybook viewport

3. **Force Mobile View**:
   ```tsx
   <Table forceMobile={true} {...props} />
   ```

## TypeScript Tips

### Type Assertion in Render Function

```tsx
mobileCardRender={(item) => {
  // Type cast the generic item
  const typedItem = item as MyDataType;
  
  return (
    <div>
      {typedItem.specificProperty}
    </div>
  );
}}
```

### Using typeof for Inline Types

```tsx
const myData = [
  { id: 1, name: "Item 1", value: 100 },
  { id: 2, name: "Item 2", value: 200 },
];

mobileCardRender={(item) => {
  const row = item as (typeof myData)[0];
  return <div>{row.name}</div>;
}}
```

## Performance Optimization

For large datasets, consider:

```tsx
import React from "react";

// Memoize the card component
const MobileCard = React.memo(({ item }: { item: YourDataType }) => {
  return (
    <div className="rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      {/* Card content */}
    </div>
  );
});

// Use in table
<Table
  mobileData={sortedData}
  mobileCardRender={(item) => {
    const row = item as YourDataType;
    return <MobileCard item={row} />;
  }}
>
  {/* ... */}
</Table>
```

## Troubleshooting

### Mobile view not showing
- Check if `mobileData` prop is provided
- Check if `mobileCardRender` prop is provided
- Verify screen width is < 768px (or use `forceMobile={true}`)

### TypeScript errors in render function
- Use type assertion: `const typed = item as YourType`
- Or use `typeof` for inline arrays: `as (typeof array)[0]`

### Styling not applying
- Check Tailwind classes are valid
- Verify custom color values use bracket notation: `bg-[rgba(...)]`
- Check z-index and stacking contexts

## Examples in Codebase

See these files for complete examples:

- **Basic**: `src/stories/table.stories.tsx` - MobileView story
- **Advanced**: `src/blocks/MobileValidatorsTable/block.stories.tsx` - Full implementation
- **Documentation**: `src/blocks/MobileValidatorsTable/README.md`

