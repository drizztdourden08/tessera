---
'@drizztdourden08/tessera': minor
---

Toolbar layout fields, all opt-in. `ToolbarLayout` takes `items`, the item ids a user hid in each toolbar, and `columns`, 1, 2 or auto for each toolbar. `migrateToolbarLayout` drops unknown toolbars and values that are not allowed, and an older layout migrates with neither field. `setToolbarItems` and `setToolbarColumns` edit them, and a `ToolbarSlot` hands `hiddenItems` and `columns` to the toolbar. `Toolbar` takes `hiddenItems`, `columns` and `onContextMenu(itemId, event)`, which also runs on Shift+F10. A vertical bar with `columns` auto wraps into two columns before it folds into More. An item takes `priority`, so the lowest folds first, and its own `onContextMenu`. The package exports `ToolbarColumns` and `ToolbarContextEvent`.
