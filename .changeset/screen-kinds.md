---
'@drizztdourden08/tessera': minor
---

Screens come in layers. `FullScreenLayer` splits into two building blocks: `ScreenLayer`, the overlay with its equal gap, the empty card and the floating slot, with a new `compact` size; and `ScreenWindow`, which adds a title, a close button and an empty container, with the same padding on all four sides and an lg gap under the title bar. Four screen kinds are built on them: `WorkspaceScreen` for a side list of pages beside a `SettingsPage`, `InfoScreen` for About and credits, `UtilityScreen` for a short task with a status, progress and actions, and `StageScreen` for one open stage with a toolbar and Done. `SettingsShell` is removed; `NavLayout` takes its `filterable` and `filterPlaceholder`. The `.fullscreen-layer*` classes become `.screen-layer*` and `.screen-window*`. The decision tree gains a full screen view. See MIGRATION.md section 52.
