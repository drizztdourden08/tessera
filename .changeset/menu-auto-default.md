---
'@drizztdourden08/tessera': minor
---

Every DropdownMenu with a trigger opens on the side with room by default: `align` now defaults to `auto`, so a trigger in the right half of the window gets its menu under its end, opening to the left at its natural width, instead of a menu squeezed against the right edge. The More menu of ActionBar and ItemCard and the row menu of RowGrid get it. A trigger in the left half keeps its menu under its start. Pass `align="start"` or `align="end"` to hold one edge.
