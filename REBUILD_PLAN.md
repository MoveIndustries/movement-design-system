# Movement Design System — Rebuild Plan

**Status:** Planning. No Figma yet (rebrand in flight).
**Goal:** Rebuild from scratch with only what's actually shared across consumer apps. The current package ships ~60 components; only 11 are used in 2+ apps. Most of it isn't a design system, it's app code that ended up in the wrong repo.

---

## 1. Guiding rule

**If only one app uses it, it lives in that app — not in the DS.**

A shared design system should contain shared primitives, brand chrome, and conventions that any of the apps could plausibly reach for. Single-consumer code masquerading as DS code is the main source of bloat today.

One pragmatic exception: a small set of generic shadcn primitives that aren't multi-consumer *yet* but obviously will be the moment any second app grows a form, a loading state, or a menu. Keeping these in the DS is cheap and prevents a re-add cycle within months. Listed explicitly in §3.

---

## 2. Scope of the audit

Scanned every import of `@moveindustries/movement-design-system` (and subpaths) across the four real consumers:

| Repo | DS version pinned | Files importing DS | Unique exports used |
|---|---|---|---|
| `staking` | ^1.1.6 | 48 | 55 |
| `bridge-interface` | ^1.1.6 | 24 | 57 |
| `movement-name-service-private` | ^1.1.5 | 42 | 37 |
| `movement-network-website` | ^1.0.0 | 1 | 1 (Footer) |

The website is effectively a non-consumer (only `Footer`) and should not drive any API decisions. All real surface-area pressure comes from staking, bridge, and MNS.

---

## 3. The new DS surface

Three buckets: **shared core** (kept), **latent generics** (kept as cheap optionality), **everything else** (moved to the consumer that uses it, or deleted if nobody does).

### 3.1 Shared core — used in 2+ repos (11 components + 2 utils/hooks)

Used in 3+ repos:
- `Footer`
- `GlobalNavMenu`
- `Dialog` suite (Dialog/Content/Title)
- `Drawer` suite
- `Accordion` suite
- `Tooltip` suite
- `toast` (sonner-based)
- `WalletModal`

Used in 2 repos:
- `Button`
- `Table` suite
- `MoveIcon` (+ `GmoveIcon`)

Plus:
- `cn` (utility)
- `useSortableData` / `useTableSort` (hooks)

### 3.2 Latent generics — kept as cheap optionality (~7 components)

These are vanilla shadcn primitives currently used by only one app, but obvious candidates for a second consumer. Keeping them costs almost nothing and avoids a near-term re-add:

`Input`, `Label`, `Select`, `Spinner`, `Skeleton`, `Breadcrumb` suite, `DropdownMenu` suite

### 3.3 Moves to the consumer (single-consumer → app)

Per the §1 rule, the following relocate out of the DS into the app that actually uses them:

- **→ `staking`:** `Text`/`Typography`, `ProgressButton`, `Slider`, `Card`, `Carousel`, `ToggleGroup`, `Progress`, `gradientBorderClasses`
- **→ `bridge-interface`:** `MultiOutlineText`, the chain/token icon set (~27 icons: Aptos, Eth, Sol, BNB, etc.). Bridge's use of `Sheet` migrates to `Drawer` during the rebuild — same UX pattern, no need for a third overlapping primitive.
- **→ `movement-name-service-private`:** `ThemeProvider` (theming becomes an app concern, not a DS concern, unless the rebrand says otherwise)

`MoveIcon`/`GmoveIcon` are brand icons and stay in the DS.

### 3.4 Delete outright (zero consumers)

From `src/components/shadcn/`:
`alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `button-group`, `checkbox`, `crypto-amount-input`, `empty`, `field`, `form`, `hover-card`, `input-group`, `item`, `list`, `menubar`, `navigation-menu`, `pagination`, `popover`, `radio-group`, `scroll-area`, `separator`, `sidebar`, `switch`, `tabs`, `textarea`, `toggle`, plus the legacy `toast.tsx` (sonner replaces it).

From `src/components/`:
`Branding`, `DottedBackground`, `Logo`, `IconButton`, `theme/*`, and the `forms.ts` subpath entry.

That's ~30 components + 1 entry point gone with no consumer impact.

### 3.5 End state

Rebuilt DS = **~18 components** + a handful of utilities/hooks. Down from ~60 today. That's the headline.

---

## 4. Proposed package shape

### 4.1 Entry points

Drop from current 5 entry points (`.`, `/carousel`, `/forms`, `/drawer`, `/wallet`) to **3**:

- `.` — primitives, nav, hooks, utilities, brand icons, toast
- `/wallet` — `WalletModal` and wallet-connection UI (heavy deps, splits cleanly)
- `/drawer` — Drawer (vaul has its own bundle weight; 3 consumers use it)

`/carousel` and `/forms` are deleted — Carousel moves to staking, forms entry was unused.

### 4.2 Directory layout

```
src/
  primitives/          # button, dialog, drawer, accordion, tooltip, table,
                       # input, label, select, spinner, skeleton,
                       # breadcrumb, dropdown-menu
  layout/              # Footer, GlobalNavMenu
  wallet/              # WalletModal
  icons/               # MoveIcon, GmoveIcon (brand only)
  hooks/               # useSortableData, useTableSort
  lib/                 # cn, toast re-export
  styles/              # tokens.css, theme.css, fonts.css, index.css
  index.ts
  wallet.ts
  drawer.ts
```

No `blocks/`, no `recipes-hooks-utils/`, no `theme-stories/`, no `composites/`. Stories stay in repo for Storybook but are excluded from the published bundle.

### 4.3 Tailwind / tokens

All consumers are on Tailwind 4 + PostCSS already. The rebuild should:

- Ship a **single tokens layer** (CSS custom properties) — colors, radii, spacing, typography — so the rebrand is a one-file swap.
- Ship a Tailwind v4 `@theme` CSS export (not a v3 preset). Consumers `@import` it from the package.
- Remove any v3 preset/plugin shims.
- Keep `fonts.css` only if rebrand fonts ship via the package; otherwise let apps own font loading.

This is the single biggest leverage point for the rebrand: **everything visual flows from one tokens file**. Figma Variables export cleanly to CSS custom properties, so the pipeline is Figma → tokens.css → consumed by `@theme` and components.

### 4.4 Peer deps

Trim aggressively. Keep only Radix peers used by §3.1 + §3.2 components. Likely cuts: radix-popover, radix-tabs, radix-switch, radix-checkbox, radix-avatar, radix-aspect-ratio, radix-hover-card, radix-menubar, radix-navigation-menu, radix-scroll-area, radix-separator, radix-toggle.

---

## 5. Resolved decisions

(Previously open in earlier drafts; now settled.)

1. **Sheet vs Dialog vs Drawer.** Drop `Sheet`. Bridge migrates its 3 Sheet usages to `Drawer`.
2. **Typography component.** Moves to staking. Tailwind v4 + tokens makes a generic `<Text>` component largely redundant; if staking still wants it, it owns it.
3. **Chain/token icons.** Move to `bridge-interface`. Brand icons (`MoveIcon`, `GmoveIcon`) stay in DS.
4. **`gradientBorderClasses`.** Moves to staking. If the rebrand keeps the gradient-border motif and a second app picks it up, promote back to DS later.
5. **`ProgressButton`.** Moves to staking.
6. **Toast.** Standardize on sonner only; delete legacy `toast.tsx`.
7. **Versioning.** Rebuild ships as `2.0.0` with a written migration note.
8. **`ThemeProvider`.** Moves to MNS unless the rebrand defines theming as a DS-wide concern.

---

## 6. Migration plan

**Phase 0 — prep (can start now, pre-Figma):**
- Stand up the new package skeleton on a `v2` branch.
- Port §3.1 + §3.2 components unchanged (they're shadcn — visuals come from tokens).
- Wire the tokens layer with current colors as placeholders.
- Set up a single Storybook target showing every shipped export.

**Phase 1 — rebrand swap (when Figma arrives):**
- Replace the tokens file. That's it for primitives.
- Redo `Footer`, `GlobalNavMenu`, `WalletModal` per new designs (these have brand-visible chrome beyond tokens).
- Update brand icons.

**Phase 2 — consumer migration:**
- Cut `2.0.0`, ship migration note (renamed paths, removed exports, what each app needs to absorb).
- Update consumers in this order: `staking` (absorbs the most code: Text, ProgressButton, Slider, Card, Carousel, ToggleGroup, Progress, gradientBorderClasses), `bridge-interface` (absorbs MultiOutlineText + chain icons; Sheet → Drawer), `movement-name-service-private` (absorbs ThemeProvider), `movement-network-website` (trivial — Footer only).

**Phase 3 — cleanup:**
- Delete the old `v1` branch tag, archive `old-README.md`, retire unused subpath entries.

---

## 7. Success criteria

- Published bundle (gzipped, main entry) is **smaller than today's** despite identical end-user functionality across the four apps.
- Every export in the published `index.d.ts` is either (a) imported by 2+ apps, or (b) listed in §3.2 as latent generics with a written rationale.
- Rebrand can be applied via a single tokens-file edit, with no component-source changes for primitives.
- All four consumers compile and render against `2.0.0` after import-path updates and absorption of the moved components.

---

## 8. Appendix — full per-component usage table

| Export | staking | bridge | mns | website | Disposition |
|---|---:|---:|---:|---:|---|
| Button | 34 | 0 | 14 | 0 | Keep (shared) |
| toast | 26 | 8 | 8 | 0 | Keep (shared) |
| MoveIcon | 28 | 1 | 0 | 0 | Keep (shared, brand) |
| Tooltip suite | 12 | 6 | 5 | 0 | Keep (shared) |
| Drawer suite | 1 | 6 | 6 | 0 | Keep (shared) |
| Dialog suite | 1 | 3 | 5 | 0 | Keep (shared) |
| WalletModal | 5 | 1 | 3 | 0 | Keep (shared) |
| Footer | 1 | 2 | 2 | 1 | Keep (shared) |
| GlobalNavMenu | 1 | 1 | 1 | 0 | Keep (shared) |
| Accordion suite | ✓ | ✓ | ✓ | 0 | Keep (shared) |
| cn | 0 | 9 | 1 | 0 | Keep (shared util) |
| Table suite | 3 | 1 | 0 | 0 | Keep (shared) |
| useSortableData | ✓ | ✓ | 0 | 0 | Keep (shared hook) |
| Input | ✓ | 0 | 0 | 0 | Keep (latent generic) |
| Label | ✓ | 0 | 0 | 0 | Keep (latent generic) |
| Select | ✓ | 0 | 0 | 0 | Keep (latent generic) |
| Spinner | 0 | 0 | 6 | 0 | Keep (latent generic) |
| Skeleton | 0 | 0 | 1 | 0 | Keep (latent generic) |
| Breadcrumb suite | 0 | 0 | ✓ | 0 | Keep (latent generic) |
| DropdownMenu suite | 0 | 0 | ✓ | 0 | Keep (latent generic) |
| Text / Typography | 19 | 0 | 0 | 0 | → staking |
| ProgressButton | 8 | 0 | 0 | 0 | → staking |
| Slider | 6 | 0 | 0 | 0 | → staking |
| Carousel | ✓ | 0 | 0 | 0 | → staking |
| Card | ✓ | 0 | 0 | 0 | → staking |
| ToggleGroup | ✓ | 0 | 0 | 0 | → staking |
| Progress | ✓ | 0 | 0 | 0 | → staking |
| gradientBorderClasses | 9 | 0 | 0 | 0 | → staking |
| MultiOutlineText | 0 | 1 | 0 | 0 | → bridge |
| Chain/token icons (~27) | 0 | many | 0 | 0 | → bridge |
| Sheet | 0 | 3 | 0 | 0 | Drop; bridge migrates to Drawer |
| ThemeProvider | 0 | 0 | 1 | 0 | → MNS |
| Branding, DottedBackground, Logo, IconButton, theme/*, alert, alert-dialog, aspect-ratio, avatar, badge, button-group, checkbox, crypto-amount-input, empty, field, form, hover-card, input-group, item, list, menubar, navigation-menu, pagination, popover, radio-group, scroll-area, separator, sidebar, switch, tabs, textarea, toggle, legacy toast.tsx, /forms entry | 0 | 0 | 0 | 0 | **DELETE** |
