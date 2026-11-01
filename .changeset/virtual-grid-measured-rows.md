---
'@drizztdourden08/tessera': minor
---

`VirtualGrid` takes `rowHeight`, `'fixed'` (the default, unchanged) or `'measured'`. With `'measured'` each row of tiles is as tall as its tallest tile, so cards with different amounts of content no longer overflow into the next row or section. `tileHeight` and `tileSize` become the least height and the guess for rows not drawn yet. The grid measures the drawn rows with one resize observer and keeps the scroll steady when a row above the view changes height. The keys, paging, scroll to index, marquee rects and reorder drop all follow the measured rows. The type `VirtualGridRowHeight` is exported.
