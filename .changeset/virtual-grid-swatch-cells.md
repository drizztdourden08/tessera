---
'@drizztdourden08/tessera': minor
---

VirtualGrid swatch cells set `touch-action: none` and may shrink to nothing. New `tileProps(item, index)` returns `{ className, data }` for one tile, and `data-tile-look="dashed"` draws a dashed border on a swatch tile, such as an add tile (I-87, Bxel P-372).
