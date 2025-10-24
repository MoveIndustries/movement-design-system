# Storybook Changelog

All notable changes to the Storybook configuration and components will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New `Drawer` component with comprehensive functionality
- Drawer supports DrawerHeader, DrawerBody, and DrawerFooter sub-components
- Drawer supports multiple placements (top, bottom, left, right) and sizes
- Drawer includes backdrop click and escape key close options
- Comprehensive Storybook stories for Drawer component
- Mock icon components for drawer demonstrations
- New `Modal` component with comprehensive functionality
- Modal supports ModalHeader, ModalBody, and ModalFooter sub-components
- Modal supports multiple sizes (sm, md, lg, xl, full) and various configurations
- Modal includes backdrop click and escape key close options
- Comprehensive Storybook stories for Modal component
- Mock icon components for modal demonstrations
- New `Menu` component with comprehensive functionality
- Menu supports MenuItem and MenuSeparator sub-components
- Menu items support icons, end icons, selection states, and disabled states
- Comprehensive Storybook stories for Menu component
- Mock icon components for menu demonstrations
- New `IconButton` component with comprehensive styling options
- IconButton supports multiple variants (filled, outlined, text, ghost)
- IconButton supports multiple colors (primary, secondary, neutral, danger, success, warning)
- IconButton supports multiple sizes (sm, md, lg) and border radius options
- Comprehensive Storybook stories for IconButton component
- Mock icon components for demonstration in stories
- Buttons directory structure for better organization
- New `BridgeButton` component with unique styling and hover effects
- Comprehensive Storybook stories for BridgeButton component
- BaseButton component to reduce code duplication across button variants

### Changed
- Refactored Button and BridgeButton components to use shared BaseButton
- Improved button component architecture for better maintainability
- Enhanced icon support across all button variants
- Organized button components into logical directory structure

### Fixed
- Resolved duplicate code between Button and BridgeButton components
- Improved type safety and prop inheritance
- Fixed import paths for button components in stories

## [1.0.0] - 2024-12-19

### Added
- Initial Storybook setup with React + Vite
- Dark theme configuration with Movement Design System colors
- Custom theme with brand colors (moveus-marigold, byzantine-blue)
- Comprehensive button component stories
- Accessibility addon configuration
- Vitest integration for testing
- Custom CSS styling for code blocks and typography
- Font integration (Neue Haas Unica Pro, TWK Everett)

### Features
- **Theme System**: Dark mode with custom brand colors
- **Component Documentation**: Auto-generated docs with MDX support
- **Interactive Controls**: Live prop manipulation in Storybook
- **Accessibility Testing**: Built-in a11y validation
- **Responsive Layouts**: Centered and padded story layouts
- **Code Highlighting**: Syntax highlighting for code examples

### Configuration
- **Framework**: React + Vite
- **Addons**: 
  - @storybook/addon-docs
  - @storybook/addon-a11y
  - @storybook/addon-themes
  - @storybook/addon-vitest
  - @chromatic-com/storybook
- **Build Tool**: Vite with custom aliases
- **Styling**: Panda CSS integration

## [0.1.0] - 2024-12-18

### Added
- Basic Storybook configuration
- Initial component stories
- Basic theme setup

---

## Migration Guide

### From v0.1.0 to v1.0.0
- Updated theme configuration to use Movement Design System colors
- Added new addons for enhanced functionality
- Improved component story organization
- Enhanced accessibility features

### Component Updates
- Button components now use shared BaseButton for consistency
- Improved icon support across all button variants
- Better prop inheritance and type safety
- New IconButton component for icon-only interactions

---

## Contributing

When adding new features or making changes to Storybook:

1. Update this changelog with your changes
2. Follow the existing format and structure
3. Include migration notes if breaking changes are introduced
4. Update version numbers appropriately

---

## Version History

- **1.0.0**: Full Storybook setup with Movement Design System integration
- **0.1.0**: Initial basic configuration
