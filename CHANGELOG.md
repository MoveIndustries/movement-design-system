# Storybook Changelog

All notable changes to the Storybook configuration and components will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New `BridgeButton` component with unique styling and hover effects
- Comprehensive Storybook stories for BridgeButton component
- BaseButton component to reduce code duplication across button variants

### Changed
- Refactored Button and BridgeButton components to use shared BaseButton
- Improved button component architecture for better maintainability
- Enhanced icon support across all button variants

### Fixed
- Resolved duplicate code between Button and BridgeButton components
- Improved type safety and prop inheritance

## [0.1.0] - 2025-09-01

### Added
- Movement PandaCSS preset
    - Design tokens
    - Typography styles
- `Collapsible` component
- `Button` component
- `BridgeButton` component
- `Card` component
- `Input` component
- `Select` component
- `Textarea` component
- `Tooltip` component
- `Modal` component
- `Drawer` component
