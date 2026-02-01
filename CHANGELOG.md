# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-02-01

### Added

- **Functional Admin Dashboard**: Complete rewrite of the admin suite.
- **New Modules**: `AnalyticsView`, `ReportsView`, `OrderManager`, `ReturnManager`, `ContentManager`, `CustomerList`, `SettingsManager`.
- **UI Library Expansion**: Added `Tabs`, `MiniChart`, `Tooltip`, `SearchInput`, `Modal`, `Badge`, `Card`.
- **GitHub Documentation**: Comprehensive `README.md`, `CONTRIBUTING.md`, `LICENSE`, and `CHANGELOG.md`.

### Changed

- **Architectural Reorganization**: Grouped all components category-wise for better maintainability (Layout, Overview, Orders, Products, etc.).
- **Enhanced Navigation**: Implemented state-driven sub-tabs for the dashboard.
- **Asset Optimization**: Replaced legacy `<img>` tags with `next/image` for performance.

### Fixed

- Fixed build errors related to relative path mismatches during reorganization.
- Resolved hydration issues by utilizing dynamic imports for client-heavy components.

## [1.0.0] - 2026-01-20

### Added

- Initial project bootstrap with Next.js 15.
- Basic frontend structures for Hero, Products, and Footer.
- Design system variables (Nature-themed palette).

---

_Generated with ❤️ by Antigravity_
