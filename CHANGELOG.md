# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2026-03-12

### Changed
- **GlobalNavMenu** — Replace header logo with Movement branding
  - Replace `heading-big.svg` (Move Industries) with `Movement-marigold.svg`
  - Desktop: `h-10` height
  - Mobile: `h-7` height

## [1.0.6] - 2026-03-06

### Changed
- **Footer** — Update default social links
  - X: `https://x.com/movement_xyz`
  - Discord: `https://discord.gg/moveindustries`
  - GitHub: `https://github.com/moveindustries`
  - Add Telegram: `https://t.me/movementlabsxyz`

## [1.0.5] - 2026-03-06

### Changed
- **Footer** — Rebrand from Move Industries to Movement
  - Replace footer logos with `Movement-marigold.svg` (wordmark) and `move-logo.svg` (M icon)
  - Desktop wide (xl+): Full "Movement" wordmark
  - Desktop medium (lg to xl): M logo only
  - Mobile: Full "Movement" wordmark centered at top
  - Update default copyright to "Movement Network Foundation"
  - Update all logo alt text to "Movement"

## [1.0.4] - 2026-03-04

### Changed
- Set transitive dependencies as direct dependencies for better compatibility

### Added
- **Icon** — Add `gMOVE` (liquid staking token) icon

### Fixed
- Use React DOM properties for better compatibility

## [1.0.3] - 2026-02-28

### Changed
- **WalletModal** — Mark as deprecated, remove wallet adapter dependencies from bundle

### Fixed
- Fix mobile drawer background styling

## [1.0.2] - 2026-02-20

### Fixed
- Restore `@okwallet/aptos-wallet-adapter` and `@msafe/aptos-wallet-adapter` dependencies

## [1.0.1] - 2026-02-10

### Fixed
- **GlobalNavMenu** — Add max-width to desktop content to prevent overflow
- Revert footer margin changes

## [1.0.0] - 2026-02-05

First public release of the Move Industries Design System on npm. This release represents the culmination of 8 months of development, from initial scaffolding (June 2025) through production hardening across Movement Labs applications. The library delivers 60+ accessible React components, a comprehensive theme system, and deep Aptos wallet integration — all built on shadcn/ui, Radix UI, and Tailwind CSS v4.

### Core Component Library

#### Layout & Containers
- **Card** — Container with header, title, description, content, footer, and action slots
- **AspectRatio** — Constrained aspect ratio wrapper
- **Separator** — Horizontal/vertical dividers
- **ScrollArea** / **ScrollBar** — Custom scrollable regions
- **Resizable** — Resizable panel groups with drag handles (ResizablePanel, ResizablePanelGroup, ResizableHandle)
- **Collapsible** — Expandable/collapsible content sections
- **Item** — Styled list item element

#### Navigation
- **Tabs** — Tabbed content navigation (TabsList, TabsTrigger, TabsContent)
- **Breadcrumb** — Breadcrumb trail with ellipsis support (BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis)
- **NavigationMenu** — Accessible navigation menus with viewport, indicators, and trigger styles
- **Menubar** — Top-level menu bar with submenus, checkboxes, radio items, and keyboard navigation
- **Pagination** — Page navigation with standard and bullet pagination variants (BulletPagination)
- **Sidebar** — Full sidebar layout system with provider, header, footer, groups, menus, sub-menus, skeleton states, rail, and useSidebar hook

#### Buttons & Controls
- **Button** — Primary button with multiple variants via `buttonVariants` (CVA)
- **ButtonGroup** — Grouped button layout
- **Toggle** / **ToggleGroup** — Toggle buttons with `toggleVariants`
- **IconButton** — Icon-only button component
- **ProgressButton** — Button with built-in progress indication

#### Form Components
- **Input** — Text input with variant support
- **Textarea** — Multi-line text input
- **Label** — Accessible form labels
- **Checkbox** — Checkbox with indeterminate support
- **RadioGroup** / **RadioGroupItem** — Radio button groups
- **Switch** — Toggle switch
- **Select** — Dropdown select with groups, scroll buttons, and separators
- **Slider** — Range slider with segmented variant support
- **InputOTP** — One-time password input
- **InputGroup** — Composite input with addons, buttons, and text (InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea)
- **CryptoAmountInput** — Specialized numeric input for cryptocurrency amounts with WalletIcon
- **Calendar** — Date picker (react-day-picker integration)
- **Command** — Command palette / combobox (cmdk integration)

#### Form Management
- **Form** — React Hook Form integration with FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage
- **Field** — Standalone field wrapper with FieldLabel, FieldError, FieldDescription, FieldGroup, FieldLegend, FieldSet, FieldTitle, FieldContent, FieldSeparator
- **useFormField** hook for field context access

#### Dialogs & Overlays
- **Dialog** — Modal dialog with `dialogContentVariants` and configurable close button
- **AlertDialog** — Confirmation/alert dialog with action and cancel buttons
- **Drawer** — Mobile-friendly slide-up drawer with drag-to-dismiss (vaul)
- **Sheet** — Side panel overlay with `sheetContentVariants` and directional support
- **Popover** — Floating content popover
- **HoverCard** — Hover-triggered information card
- **ContextMenu** — Right-click context menus with full sub-menu support
- **Tooltip** — Tooltip with provider for delay/skip configuration

#### Menus & Dropdowns
- **DropdownMenu** — Full dropdown menu system with checkbox items, radio groups, sub-menus, shortcuts, labels, separators, and portal support

#### Data Display
- **Table** — Data table with header, body, row, cell, footer, caption, and `TableVariant` type support
- **List** — Styled lists with `listVariants`, `listItemVariants`, and `bulletVariants`
- **Accordion** — Expandable content sections with hover interaction support
- **Carousel** — Content carousel with navigation (embla-carousel)
- **Badge** — Status/label badges with `badgeVariants`
- **Avatar** — User avatars with image, fallback, and `avatarVariants`
- **Skeleton** — Loading placeholder skeletons
- **Empty** — Empty state display component

#### Typography
- **Typography** / **Text** — Text rendering with `typographyVariants` for consistent type scales
- **Kbd** — Keyboard shortcut display
- **MultiOutlineText** — Decorative text with multiple configurable outline layers and thickness control

#### Feedback & Status
- **Alert** — Alert banners with title and description
- **Progress** — Progress bar
- **Spinner** — Loading spinner

#### Notifications
- **Toaster** / **toast** — Sonner-based toast notification system with movement-branded styling
- **GlobalToaster** / **movementToast** — Application-wide toast singleton with typed variants (success, error, warning, info)
- **toastVariants** — Visual toast variant definitions
- Toast types: `CreateToastArgs`, `TypedToastArgs`, `ToastVariant`
- Mobile-optimized toast positioning with queued display

### Movement-Specific Components

#### Branding
- **Branding** — Movement/Move Industries brand assets with theme (industries, labs), variant (lockup-long, lockup-short, logomark, moveus), and color (black, white, color) support
- **Logo** — Movement logo component
- **DottedBackground** — Decorative dotted pattern background

#### Global Navigation
- **GlobalNavMenu** — Global product navigation menu for Movement ecosystem apps
  - Desktop flyout menu with product blocks
  - Mobile drawer variant with responsive breakpoint handling
  - `productBlockVariants` for consistent product card styling
  - Configurable nav items via `NavMenuItem` type

#### Footer
- **Footer** — Responsive footer with desktop and mobile layouts
  - **DesktopFooter** / **MobileFooter** — Layout-specific sub-components
  - Configurable link columns via `FooterColumn` / `FooterLink` types
  - Social icon row via `SocialLink` type
  - `footerLinkVariants`, `footerHeaderVariants`, `socialIconVariants`

#### Wallet Integration
- **WalletModal** — Aptos wallet connection dialog
  - Responsive: dialog on desktop, drawer on mobile
  - Wallet providers: Nightly, OKX, MSafe, Petra, Aptos Connect
  - Automatic wallet detection and sorting
  - `ConnectWalletDialogProps` type

### Icon System

- **Icon** component with comprehensive icon library
- 44+ crypto, network, and wallet asset icons: Aptos, Avalanche, Binance, BSC, Bitcoin (multiple variants), Coinbase, Ethereum, Movement (logomark, wordmark), Polygon, Solana, MetaMask, Nightly, Petra, Rabby, Razor, Sender, and more
- Full Phosphor Icons integration via `@phosphor-icons/react`
- Lucide React icons for UI primitives

### Theme System

#### CSS Custom Properties
- Multi-layer token architecture:
  - **Primitive tokens** — raw spacing, sizing, border-radius, border-width, shadow, opacity scales
  - **Brand colors** — Movement palette (moveus-marigold, guild-green, etc.)
  - **Semantic tokens** — background, foreground, border, ring mapped to brand colors
  - **Component tokens** — per-component color/spacing overrides (accordion, badge, card, input, sidebar, toast, etc.)
- Light and dark mode support via `prefers-color-scheme` and `.dark` class
- **ThemeProvider** — React context provider for theme state
- **ThemeSwitcher** — Theme picker UI
- **ThemeToggle** — Simple light/dark toggle
- **useTheme** hook

#### Design Tokens (JS)
- `spacing` — 21-value spacing scale (0–384px)
- `sizes` — All spacing values plus prose, full, min, max, fit
- `radii` — Border radius scale (sm through full)
- `borderWidths` — 0–8px scale
- `shadows` — xs through 2xl, inner, none
- `zIndex` — Semantic z-index scale (hide, base, docked, dropdown, sticky, banner, overlay, modal, popover, skipLink, toast, tooltip)

#### CSS Exports
- `@movementlabsxyz/movement-design-system/component-styles` — Component CSS
- `@movementlabsxyz/movement-design-system/theme` — Theme variables
- `@movementlabsxyz/movement-design-system/fonts` — Font definitions

### Styling Utilities

- **cn()** — Tailwind-safe class name merging (clsx + tailwind-merge)
- **gradientBorderClasses** — Gradient border recipes (.gradient-border-glow, .gradient-border-error, .gradient-border-iridescent, .gradient-border-diagonal)
- **glassBackgroundClasses** — Glass morphism effects (.glass-background-dark, .glass-background-light)
- **gradientBackgroundClasses** / **getGradientClass()** — Gradient background helpers (.gradient-mint-cyan, .gradient-glass-overlay)
- **Iridescent variants** — Iridescent border and input styling recipes

### Hooks

- **useIsMobile** — Responsive breakpoint detection
- **useSidebar** — Sidebar open/close state management
- **useFormField** — React Hook Form field context
- **useTableSort** / **useSortableData** — Table column sorting with `SortDirection` and `SortFunction` types
- **useTheme** — Theme state access

### Build & Distribution

- Vite library mode build with ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) outputs
- TypeScript declarations via `vite-plugin-dts` and `tsc`
- Tree-shakeable exports with proper `sideEffects` configuration
- Source maps for debugging
- `prepublishOnly` script runs full build automatically
- Peer dependencies: React 18/19, React DOM, Tailwind CSS v4, @aptos-labs/wallet-adapter-react
- Storybook 9 documentation site with interactive examples

### Reference Blocks (Non-exported)

The following example implementations are included in the source as reference patterns:
- HamburgerMenu, PaginatedTable, ValidatorsTable, MobileValidatorsTable, StakeForm, StakingBalance
