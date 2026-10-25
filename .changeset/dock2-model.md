---
'@drizztdourden08/tessera': minor
---

ToolbarLayout is now v2: toolbars have an extent (start and size along their lane), lanes hold several toolbars, and corners record which side claims each one. migrateToolbarLayout upgrades v1 layouts, and toolbarIdsOf, normalizeCorners, placeToolbar, MAX_LANES and MIN_SHARE are new. MAX_PER_SIDE stays as a deprecated alias of MAX_LANES.
