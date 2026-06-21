# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2026-06-18

Makes the unified footer truly self-contained and fixes a `lucide-react` install conflict. The 1.2.1 footer borrowed the host app's Tailwind utilities and CSS variables, so the same component rendered differently per app (and its desktop logo size got clobbered by the consuming app's own `.h-9`); this release scopes all footer styling inside the design system so it renders identically everywhere with no per-app workarounds.

### Fixed

- **Footer — self-contained styling.** All footer styling now lives in `footer.css` (compiled into the `component-styles` bundle) under scoped `.mvmt-footer*` classes with literal values and a fixed `768px` breakpoint. The footer no longer uses ambient Tailwind utility classes (`h-9` / `md:h-11` / `text-[24px]`) or reads host CSS variables (`--container-max` / `--container-padding-x` / `--font-display`) for layout, sizing, or typography, so it renders identically across Bridge, Staking, Explorer, and Faucet. Text uses the bundled `"ABC Oracle"` face directly (see below), and the footer's top margin was removed (it leaked the host page background above the black slab).
- **Brand fonts bundled.** The ABC Oracle / RecifeText `@font-face` rules now ship in the `component-styles` bundle (external `url()`s, woff2 load on use), so components render the brand font wherever the DS CSS loads — instead of depending on each app to expose it via `--font-display`, which broke in apps that mis-scoped that variable. Font tokens and the `body` fallback now end with the literal brand face. New `brand-faces.css` is the shared `@font-face` source.
- **WalletModal** — uses the standard `font-display` utility instead of ad-hoc `font-[family-name:var(--font-display,sans-serif)]` values.
- **`lucide-react` peer conflict.** The peer range `^0.500.0` only allowed `0.500.x` (caret on a `0.x` version), so consumers on any newer `lucide-react` (e.g. `0.562.0`; latest is `1.21.0`) failed `npm install` with an ERESOLVE peer conflict. `lucide-react` is now bundled into the package (removed from `peerDependencies` and from the build's `external` list) — the icons used are tree-shaken in (`sideEffects: false`, ~1 KB added) and the package no longer emits a bare `lucide-react` import, so consumers never resolve or install it.

## [1.2.1] - 2026-06-17

Unified footer release. Replaces the pre-rebrand `Footer` with the Bridge footer — the source-of-truth design — so Bridge, Staking, Explorer, and Faucet all render one consistent footer from a single source. Also repairs the brand-font wiring (the `font-*` utilities were partly broken) and removes ~4.8 MB of unused legacy font files from the package.

### Changed

- **Footer** — Rebuilt to match the Bridge footer: solid-black slab with a "Powered by Movement" monogram + wordmark (left), Explore / Builders / Resource link columns (right), a hairline divider, and a legal row with `Movement © {year}` + Terms/Privacy (left) and X / Discord / GitHub / Telegram / LinkedIn social icons (right). Now a single responsive component (stacks below the `md` breakpoint) instead of separate desktop/mobile trees. Framework-agnostic (plain `<a>`, inline-SVG icons) and self-contained: width/padding read `var(--container-max)` / `var(--container-padding-x)` with the Bridge reference values (`1728px` / `clamp(1rem, 5.8vw, 100px)`) as fallbacks, and typography reads `var(--font-display)`. Sensible defaults render the full Movement footer with no props.

### Fixed

- **Fonts** — Repaired the `font-*` token wiring so the brand faces actually render. `@theme` was missing `--font-display`, `--font-sans`, and `--font-serif`, so the `font-display` / `font-sans` classes used across components generated nothing and RecifeText was never reachable; `body` referenced an undefined `--font-family-body` and fell back to the browser default. `@theme` now defines `font-sans` / `font-display` / `font-heading` / `font-body` (→ `var(--font-display)` — ABC Oracle), `font-serif` (→ `var(--font-serif)` — RecifeText), and `font-mono` (→ generic system monospace; no longer mis-mapped to ABC Oracle, and deliberately not an imposed stack — consumers can set `--font-mono` if they want a specific one), and `body` reads `var(--font-display)`. Fixes apply to every consumer, not just Storybook.

### Removed

- **`DesktopFooter`, `MobileFooter`** exports and the `footerLinkVariants` / `footerHeaderVariants` / `socialIconVariants` style helpers — the footer is now one responsive component. The `FooterProps` shape changed (`showHeading` / `heading` removed; `legalLinks`, `brandHref`, `brandLabel` added). No consumer app passed footer props, so this is a drop-in `<Footer />` swap.
- **Unused font files** — the 41 legacy `TWKEverett*` / `NeueHaasUnicaPro` `.otf` files (~4.8 MB) were still in `src/assets/fonts/` and copied into the published package, though no `@font-face` or component referenced them. Removed; the package now ships only the ABC Oracle + RecifeText `.woff2` files actually used.

### Added

- **Storybook — Theme/Fonts** — a Fonts section showcasing ABC Oracle (display/sans), RecifeText (serif), the monospace stack, their weights/italics, and the `font-*` utilities with what each resolves to. Stale "TWK Everett / Neue Haas Unica Pro" copy in the Typography stories updated to the real faces.

## [1.2.0] - 2026-06-15

Rebrand release: aligns the design system with the cyan brand and ABC Oracle fonts already shipped across the consumer apps, and removes legacy components no app uses. Drop-in for all current consumers — none import a removed export (see migration note).

### Changed

- **Colors** — Brand palette is now Movement cyan (`#15EDEB`) + neutrals, with proper names: the brand ramp is `--color-cyan-*` and the neutral ramp is `--color-neutrals-*`. The legacy `--primary` / `--ring` / chart / sidebar tokens point at cyan. Feedback colors (`success`/`warning`/`error`/`info`) set to a functional palette. `recipes.css` gradients and the `Button` `glow` variant recolored to cyan.
- **WalletModal** — Rebuilt to the finalized design: flat `#2d2d2d` card, hairline white border, `24px` radius, flat `#090909` wallet tiles, ABC Oracle type via `var(--font-display)`, no desktop close button. The brand-cyan accents (wallet-tile hover glow, INSTALL pill, "Don't have a wallet?" link) now use the brand token `var(--color-cyan-300)` directly, so the hover highlight is consistently cyan across all sites without per-app overrides. Public API unchanged.
- **Fonts** — Components reference `var(--font-display | --font-serif | --font-mono)` instead of hardcoded families.

### Added

- **`/fonts` entry** — now ships ABC Oracle + RecifeText (`@font-face` + `.woff2`). Optional; Next.js apps that self-host via `next/font` can ignore it.

### Removed

- **Brand ramps** — `moveus-marigold`, `protocol-pink`, `oracle-orange` (cyan + neutrals only now).
- **Legacy brand-color token names** — `guild-green-*` and `byzantine-blue-*` removed; use `--color-cyan-*` and `--color-neutrals-*`. (The consumer apps define these names locally in their own `tokens.css`/`theme.css`, so this is non-breaking for them.)
- **Fonts** — TWK Everett / Neue Haas Unica Pro (replaced by ABC Oracle / RecifeText).
- **Components** (zero consumers): `AlertDialog`, `AspectRatio`, `ButtonGroup`, `Checkbox`, `CryptoAmountInput`, `Empty`, `Field`, `Form`, `HoverCard`, `InputGroup`, `Item`, `List`, `Menubar`, `NavigationMenu`, `RadioGroup`, `ScrollArea`, `Separator`, `Sidebar`, `Switch`, `Textarea`, `Toggle`, `Branding`, `DottedBackground`, `Logo`, `MultiOutlineText`, `ThemeSwitcher` / `ThemeToggle` / `useTheme`, `GlobalNavMenu` (+ `productBlockVariants`, `GlobalNavMenuProps`, `NavMenuItem`).
- **`/forms` entry point** (the `react-hook-form` form components).
- Internal `src/blocks/` app-specific composites (never exported).

### Migration

No consumer currently imports any removed export, so the bump is drop-in. Apps may delete their now-redundant local color/WalletModal/font override CSS, which the design system now provides natively.

## [1.1.6] - 2026-03-30

### Changed

- **WalletModal** — Wallet list tiles use each wallet’s `icon` from the adapter (`WalletItem.Icon`), not a hardcoded Nightly asset.

### Added

- **Storybook — DebugAdapterMetadata** — Inspect `useWallet().wallets` (thumbnails, shallow JSON, `console.table`, warnings when multiple names share the same icon or Chrome Web Store URL in adapter data).
- **Storybook — WithSortingOptions** — Example `sortAvailableWallets` that places Nightly first and sorts the rest alphabetically by name.

## [1.1.5] - 2026-03-16

### Added

- **WalletModal description prop** — Added optional `description` prop to customize the text shown below the title
  - Default: "Securely connect your wallet to the Movement Network."
  - Pass custom `React.ReactNode` to override

## [1.1.4] - 2026-03-15

### Fixed

- **Missing component styles** — Tailwind CSS now compiles during library build

## [1.1.3] - 2026-03-15

### Fixed

- **Peer dependency bloat** — Consumers no longer need to install unused dependencies
  - Carousel, Form, Drawer, and WalletModal moved to separate tree-shakeable entry points
  - Carousel, Form, and Drawer deps are bundled — no installs required
  - WalletModal still requires `@moveindustries/wallet-adapter-react` as peer dep (for shared context)
  - Removed 8 unused peer dependencies (recharts, react-day-picker, date-fns, cmdk, input-otp, react-resizable-panels, zod, @hookform/resolvers)

  ```ts
  // These work without installing extra deps
  import { Carousel } from "@moveindustries/movement-design-system/carousel"
  import { Form } from "@moveindustries/movement-design-system/forms"
  import { Drawer } from "@moveindustries/movement-design-system/drawer"

  // This requires: pnpm add @moveindustries/wallet-adapter-react
  import { WalletModal } from "@moveindustries/movement-design-system/wallet"
  ```

## [1.1.1] - 2026-03-15

### Fixed

- **Storybook** — Add missing `@import "tailwindcss"` to `index.css` so Storybook renders styles correctly

## [1.1.0] - 2026-03-14

### Changed

- **Bundle size** — Reduced from ~13.5MB to ~1.2MB (431KB gzipped, 91% reduction) by externalizing dependencies
  - Removed re-export of entire Phosphor icon library (~9,500 icons)
  - Externalized lucide-react, recharts, sonner, vaul, and all Radix UI primitives
  - Only small utilities (clsx, tailwind-merge, class-variance-authority) remain bundled

- **Icons** — Phosphor icons no longer re-exported
  - Import Phosphor icons directly from `@phosphor-icons/react`
  - Asset icons (MoveIcon, USDCIcon, etc.) still exported from main bundle

- **Dependencies** — Most UI dependencies moved to peerDependencies
  - Consumers must install: `@phosphor-icons/react`, `lucide-react`, `sonner`, `vaul`, `recharts`, `@radix-ui/*`, and others

- **WalletModal** — Simplified and lightened
  - `@moveindustries/wallet-adapter-react` moved to peerDependencies (consumers must install it)
  - Removed auto-adding of OKX and MSafe wallets (reduced bundle by ~6MB)
  - WalletModal now displays only the wallets provided by your app's WalletProvider

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
