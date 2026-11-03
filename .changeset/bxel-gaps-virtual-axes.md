---
'@drizztdourden08/tessera': minor
---

VirtualList takes `scrollParent` (an element, a ref or `auto`) so a horizontal strip inside an outer scroller draws from that scroller and scrolls it near the edge while a row is dragged, `initialFocusIndex` for the first tab stop, and `onPick(index, event)` for a click or Enter. Navigator `step` and `bigStep` also take `{ x, y }` for a distance on each axis (I-82, Bxel P-364 P-365).
