---
'@drizztdourden08/tessera': minor
---

DataTable takes `groupActions` for icon buttons on a group header, `onRowMove(fromKey, target)` for a grip that reorders rows by drag or by Up and Down, and `rowDragData` to drag rows out to an app drop target. The move target gives the shown index, the keys of the rows the drop lands between and the group it lands in, and a `ref` on DataTable gives `getRects()` with a rect for every row in the layout so `useMarqueeSelect` can pick rows of a windowed table; `useReorderDrag` also takes an optional `locate`.
