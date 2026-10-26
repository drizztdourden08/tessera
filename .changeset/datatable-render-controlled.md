---
'@drizztdourden08/tessera': minor
---

DataTable takes `renderCell(row, path)` to draw a cell itself, falling back to the schema when it returns undefined, `rowState(row)` to mark a row active, pending, error or muted, and `rowHeight`, a size token, for taller rows. It also takes `sort` with `onSortChange` and `expanded` with `onExpandedChange` to let the app own the sort and the open groups. The new `groupUid` export builds the group ids that `expanded` holds.
