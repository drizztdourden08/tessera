---
"@drizztdourden08/tessera": minor
---

DockLayout keeps widget groups apart and can snap floating widgets. `WidgetDefinition` takes `group?: string`, and WidgetManager never lets widgets of different groups tab or split into each other's panes; widgets with no group form one group. DockLayout and WidgetManager take `canDrop?: (id, drop: DockDrop) => boolean` for any other rule, where `DockDrop` names the kind (`tab`, `split`, `float`), the slot (`pane`, `main`, `stage`), the pane and the side. A refused drop shows no hint and does nothing. `floatSnap?: number`, off by default, snaps the edges of a floating widget moved or resized within that many pixels of the stage, the main view or another floating widget, with thin guide lines in `--c-primary-bright`. `keepsGroups` is exported for hosts that draw DockLayout themselves.
