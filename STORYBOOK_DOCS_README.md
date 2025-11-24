# Storybook Documentation for Recipes, Hooks & Utils

All recipes, hooks, and utilities are now documented in Storybook with individual pages at the top level! 🎉

## 📁 File Structure

```
src/recipes-hooks-utils/
├── Overview.mdx                          ← Main overview page
├── recipes/                              ← 6 recipe files
│   ├── buttonVariants.mdx
│   ├── badgeVariants.mdx
│   ├── toggleVariants.mdx
│   ├── typographyVariants.mdx
│   ├── navigationMenuTriggerStyle.mdx
│   └── toastVariants.mdx
├── hooks/                                ← 5 hook files
│   ├── useIsMobile.mdx
│   ├── useTableSort.mdx
│   ├── useSortableData.mdx
│   ├── useSidebar.mdx
│   └── useFormField.mdx
├── utils/                                ← 5 utility files
│   ├── cn.mdx
│   ├── gradientBorderStyles.mdx
│   ├── gradientBorderClasses.mdx
│   ├── glassBackgroundStyles.mdx
│   └── glassBackgroundClasses.mdx
└── theme-scales/                         ← 6 theme scale files
    ├── spacing.mdx
    ├── sizes.mdx
    ├── radii.mdx
    ├── borderWidths.mdx
    ├── shadows.mdx
    └── zIndex.mdx
```

## 🎯 Storybook Structure

Once Storybook is running, you'll see these as **top-level categories**:

```
📖 Recipes, Hooks & Utils                 ← Overview page

📋 Recipes                                ← Top-level section
  ├── buttonVariants
  ├── badgeVariants
  ├── toggleVariants
  ├── typographyVariants
  ├── navigationMenuTriggerStyle
  └── toastVariants

🎣 Hooks                                  ← Top-level section
  ├── useIsMobile
  ├── useTableSort
  ├── useSortableData
  ├── useSidebar
  └── useFormField

🔧 Utils                                  ← Top-level section
  ├── cn
  ├── gradientBorderStyles
  ├── gradientBorderClasses
  ├── glassBackgroundStyles
  └── glassBackgroundClasses

🎨 Theme Scales                           ← Top-level section
  ├── spacing
  ├── sizes
  ├── radii
  ├── borderWidths
  ├── shadows
  └── zIndex
```

## 🚀 View the Documentation

Start your Storybook:

```bash
pnpm storybook
```

Then navigate to the top-level sections in the sidebar:
- **Recipes, Hooks & Utils** - Overview page
- **Recipes** - Individual recipe pages
- **Hooks** - Individual hook pages
- **Utils** - Individual utility pages
- **Theme Scales** - Individual theme scale pages

## 📊 What's Documented

### ✅ Recipes (6 items)
Each recipe has its own dedicated page with:
- Import statement
- Available variants/options
- Multiple code examples
- Real-world use cases

1. `buttonVariants` - 10 variants, 11 sizes
2. `badgeVariants` - 8 variants
3. `toggleVariants` - 2 variants, 3 sizes
4. `typographyVariants` - 17 text styles
5. `navigationMenuTriggerStyle` - Nav trigger styling
6. `toastVariants` - Toast types array

### ✅ Hooks (5 items)
Each hook has its own page with:
- Purpose and return values
- Basic and advanced examples
- SSR considerations where applicable
- Context requirements

1. `useIsMobile` - Mobile detection (< 768px)
2. `useTableSort` - Table sorting state
3. `useSortableData` - Data sorting with custom functions
4. `useSidebar` - Sidebar control
5. `useFormField` - Form field state

### ✅ Utilities (5 items)
Each utility has its own page with:
- Setup instructions (where applicable)
- Multiple usage examples
- Integration examples
- Best practices

1. `cn` - Class name merging
2. `gradientBorderStyles` - Gradient border CSS
3. `gradientBorderClasses` - Gradient border classes
4. `glassBackgroundStyles` - Glass morphism CSS
5. `glassBackgroundClasses` - Glass background classes

### ✅ Theme Scales (6 items)
Each scale has its own page with:
- Available values table
- Component examples
- Common use cases
- Best practices

1. `spacing` - Spacing values (0-100, px)
2. `sizes` - Size values (spacing + semantic)
3. `radii` - Border radius (sm to 3xl, full)
4. `borderWidths` - Border widths (0-8)
5. `shadows` - Box shadows (xs to 2xl, inner)
6. `zIndex` - Z-index layers (hide to tooltip)

## 📝 Documentation Features

Each page includes:
- ✅ Clear import statement
- ✅ Available options/values
- ✅ Multiple practical code examples
- ✅ TypeScript type examples
- ✅ Integration examples
- ✅ Common use cases table (where applicable)
- ✅ Best practices and notes

## 💡 Benefits of Top-Level Organization

1. **Easy Navigation** - Each category is a top-level section
2. **Better Discoverability** - Find items at a glance
3. **Focused Categories** - Each section is dedicated to one type
4. **Shareable Links** - Link directly to specific items
5. **Better Organization** - Clear separation by function

## ✨ Example URLs

With the new structure, you can link directly to:
- `/docs/recipes-buttonvariants--docs`
- `/docs/hooks-useismobile--docs`
- `/docs/utils-cn--docs`
- `/docs/theme-scales-spacing--docs`

## 📦 All Items Are Exported

All 22 documented items are properly exported in `src/index.ts`. No changes needed!

## 🎉 Summary

**Total Files Created:** 23 MDX files (1 overview + 22 individual pages)  
**Organization:** 4 top-level categories (Recipes, Hooks, Utils, Theme Scales)  
**Total Items Documented:** 22  
**All Items Exported:** ✅  
**Storybook Ready:** ✅

Your Storybook now has a clean, top-level organization for all recipes, hooks, utilities, and theme scales!

---

**Next Steps:**
1. Run `pnpm storybook` to view the documentation
2. Check the top-level sections in the sidebar
3. Browse individual pages for detailed information
4. Share specific page links with your team
