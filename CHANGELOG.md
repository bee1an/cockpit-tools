# Changelog

English · [简体中文](CHANGELOG.zh-CN.md)

All notable changes to Antigravity Cockpit Tools will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.2.0] - 2026-01-21

### Added
- **Update Checker**: Implemented automatic update checking via GitHub Releases API.
  - On startup, the app checks for new versions (once every 24 hours by default).
  - A beautiful glassmorphism notification card appears in the top-right corner when an update is available.
  - Manual "Check for Updates" button added to **Settings → About** page with real-time status feedback.
  - Clicking the notification opens the GitHub release page for download.
- **i18n**: Added update notification translations for all 17 supported languages.

---

## [0.1.0] - 2025-01-21

### Added
- **Account Management**: Complete account management with OAuth authorization support.
  - Add accounts via Google OAuth authorization flow.
  - Import accounts from Antigravity Tools (`~/.antigravity_tools/`), local Antigravity client, or VS Code extension.
  - Export accounts to JSON for backup and migration.
  - Delete single or multiple accounts with confirmation.
  - Drag-and-drop reordering of account list.
- **Quota Monitoring**: Real-time monitoring of model quotas for all accounts.
  - Card view and list view display modes.
  - Filter accounts by subscription tier (PRO/ULTRA/FREE).
  - Auto-refresh with configurable intervals (2/5/10/15 minutes or disabled).
  - Quick switch between accounts with one click.
- **Device Fingerprints**: Comprehensive device fingerprint management.
  - Generate new fingerprints with customizable names.
  - Capture current device fingerprint.
  - Bind fingerprints to accounts for device simulation.
  - Import fingerprints from Antigravity Tools or JSON files.
  - Preview fingerprint profile details.
- **Wakeup Tasks**: Automated account wakeup scheduling system.
  - Create multiple wakeup tasks with independent controls.
  - Supports scheduled, Crontab, and quota-reset trigger modes.
  - Multi-model and multi-account selection.
  - Custom wakeup prompts and max token limits.
  - Trigger history with detailed logs.
  - Global wakeup toggle for quick enable/disable.
- **Antigravity Cockpit Integration**: Deep integration with the VS Code extension.
  - WebSocket server for bidirectional communication.
  - Remote account switching from the extension.
  - Account import/export synchronization.
- **Settings**: Comprehensive application settings.
  - Language selection (17 languages supported).
  - Theme switching (Light/Dark/System).
  - WebSocket service configuration with custom port support.
  - Data and fingerprint directory shortcuts.
- **i18n**: Full internationalization support for 17 languages.
  - 🇨🇳 简体中文, 🇹🇼 繁體中文, 🇺🇸 English
  - 🇯🇵 日本語, 🇰🇷 한국어, 🇻🇳 Tiếng Việt
  - 🇩🇪 Deutsch, 🇫🇷 Français, 🇪🇸 Español, 🇮🇹 Italiano, 🇵🇹 Português
  - 🇷🇺 Русский, 🇹🇷 Türkçe, 🇵🇱 Polski, 🇨🇿 Čeština, 🇸🇦 العربية
- **UI/UX**: Modern, polished user interface.
  - Glassmorphism design with smooth animations.
  - Responsive sidebar navigation.
  - Dark mode support with seamless theme transitions.
  - Native macOS window controls and drag region.

### Technical
- Built with Tauri 2.0 + React + TypeScript.
- SQLite database for local data persistence.
- Secure credential storage using system keychain.
- Cross-platform support (macOS primary, Windows/Linux planned).
