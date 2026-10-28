---
"@drizztdourden08/tessera": minor
---

`useSelectionModel` is the new picking kit in `composites/selection`, taken out of the row selection of `DataTable`, which behaves as before. It takes the keys in display order and the selected set, and gives `click`, `toggle`, `extend`, `step`, `checkAll`, `selectAll`, `clear`, `allState` and an `onKeyDown` for Ctrl and A, Space, Shift with Space, Escape and type ahead. With `cellOf` Shift takes the rectangle between two cells, and `isHole` skips keys that cannot be picked. The helpers `rectKeys`, `toggledKey` and `typeAheadIndex` come with it.

`VirtualGrid` takes `selection`, `holes`, `getLabel` and `reorder`. A drag moves the picked tiles with an insertion line, edge scroll and a polite announcement, Alt with an arrow moves them by key, and a section with `onDrop` takes tiles on its header with an into mark. `VirtualList` takes `orientation` set to horizontal with `itemSize`, `selection`, `getLabel`, and a `ref` with `scrollToIndex` and `getRects` for a marquee. The `virtual` kit gains `readHorizontalMetrics`, `stepVirtualSize` and an `axis` for `useVirtualFocus`.

`useReorderDrag` takes `keys` for a set, `scrollRef` for edge scroll and `onDrop(from, to, drop)` with the keys, the gap and the modifier held. It returns `dragKeys` and `point`. `moveSet`, `stepGap` and `modifierOf` are new, and `DragGhost` draws a count with up to three stacked thumbnails at the pointer. `useMarqueeSelect` returns `cells`, the bounds of the cells hit, from rects that carry a `cell`, and `hitItems` and `cellRectOf` are exported.
