# AGH Plugin Manager

This is an AGH Harness plugin converted from an upstream plugin manager.

## What this plugin does

The original plugin was a UI-based plugin manager for the upstream host, providing:
1. **plugins.detail.section**: A UI section listing installed plugins, their versions, sources, and enabled status.
2. **better-sidebar**: A custom sidebar injected into the upstream host UI.

In AGH, these are exposed as tools that return structural data. However, due to the lack of UI rendering and host RPC capabilities in AGH, these tools currently return capability-unavailable status.

## Installation

```bash
npm install @agh-hub/plugin-manager
```

Or use the AGH package installation command to add this plugin to your AGH instance.

## Credentials Configuration

No credentials required. This plugin does not access any external services or APIs.

## Differences from the original plugin

- **UI Rendering**: The original plugin rendered UI components using React and DOM injection. AGH does not have a UI rendering capability, so the tools return data structures instead.
- **Host RPC Channels**: The original plugin communicated with the upstream host via `ctx.webServer` (`/plugin-installer` route) and Cordis dependency injection (`ctx.provide`, `ctx.inject`). AGH does not support these mechanisms.
- **Live Plugin Management**: The original plugin could list, install, uninstall, and toggle plugins. AGH does not have a plugin management service API, so these operations are not available.
- **Degradation**: Both registered tools return an `unsupported_capability` status indicating that the underlying host mechanisms are missing in AGH.