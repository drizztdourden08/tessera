---
'@drizztdourden08/tessera': minor
---

`TypeMark` gains `variant`, `'tile'` (default) or `'outline'`. The outline shows only the icon in the category colour, with no tile, border or padding, and its box is the icon size. `Avatar` gains a picture face, `src`, which fills the shape and is cropped to it with `label` as alt text; if the picture fails to load, the initials of the label show instead. `Avatar` also gains `shape`, `'circle'` (default) or `'square'`, and the new types `AvatarShape` and `TypeMarkVariant` are exported (I-94).
