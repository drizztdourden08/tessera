---
"@drizztdourden08/tessera": minor
---

One Escape stack by level for every layered surface, with `useEscapeStack` for apps: DialogShell, Drawer, ScreenLayer (new `onClose`, passed by ScreenWindow), the popup stack, menus, GuidedTour, confirm asks, a DockLayout drag and a filled Video take Escape from it, innermost first, and a key a control already handled is left alone. `IdRefOptionResolver` gets the working record; CompactRecordView takes `fieldRenderers` and draws group headings in the secondary accent; `SchemaConfig.options` takes `{ value, label }` and keeps numbers as numbers; the enum editor falls back to a searchable Select when its control does not fit the row, sharing `useChoiceFit` with SettingsRow; DropZone takes media types, a `status` line and Ctrl+V paste.
