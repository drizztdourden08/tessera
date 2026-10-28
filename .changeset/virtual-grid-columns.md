---
'@drizztdourden08/tessera': minor
---

VirtualGrid takes a `columns` prop that fixes the tiles in every row, such as the width of a tileset. Rows break at that count whatever the width, tiles keep their `tileSize`, and a box narrower than the columns scrolls sideways. The arrow and Page keys, the Shift rectangle, the marquee rects, reorder and sections all use the fixed count. Without `columns` the count still follows the width.
