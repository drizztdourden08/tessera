---
'@drizztdourden08/tessera': patch
---

`Tile` now puts its name before the corner marks in the document. A text badge such as a count in a corner used to read before the name, so the accessible name said "3 hero" while the visible order is "hero 3", and the label in name check failed. The corners are placed over the media with the same look as before, so nothing moves on screen.
