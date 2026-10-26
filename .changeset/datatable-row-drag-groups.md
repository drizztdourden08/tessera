---
'@drizztdourden08/tessera': minor
---

DataTable takes `groupActions` for icon buttons on a group header, `onRowMove` for a grip that reorders rows by drag or by Up and Down, and `rowDragData` to drag rows out to an app drop target. A `ref` on DataTable gives `getRects()` with a rect for every row in the layout, drawn or not, so `useMarqueeSelect` can pick rows of a windowed table; `useReorderDrag` also takes an optional `locate`.
