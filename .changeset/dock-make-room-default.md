---
"@drizztdourden08/tessera": patch
---

A docked pane saved without `makeRoom` makes room. `migrateLayout` sets `makeRoom: true` on such panes, and DockLayout and `mainRectOf` read a missing `makeRoom` as true, so the main view no longer runs under the panes of an older saved layout. A pane with `makeRoom: false` still overlays, and an overlay pane now widens the main view only on its own side, never over a pane that makes room.
