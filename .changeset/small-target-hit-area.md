---
'@drizztdourden08/tessera': patch
---

`Button` and `IconButton` at `size="xs"`, and a `Tag` you can select, now pass the axe target size check when they sit close to another control, in a short panel or when a row wraps. The control is a 24 by 24 px box (24 px high for a labelled `Button` and a `Tag`) with a 2 px transparent gutter, and it takes no more room than before: a negative margin of the same size keeps the layout, and the border, fill, hover, active, focus and tone rings are drawn on the old 20 px box, so the look is unchanged. The gutter is the new token `--hit-gutter`, `(--hit-area-min - --control-h-xs) / 2`. Pixel look buttons, pixel icons and the large `Tag` are already 24 px or more and are left as they were.
