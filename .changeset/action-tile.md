---
"@drizztdourden08/tessera": minor
---

`ActionTile` is new, under Composites · Content: one headline value in a tile that also does one thing (Archipelia review T-24, from the T-07 proposal). It reads like a StatTile (`label`, `value`, `unit`, `tone`) and adds `meta`, an `icon`, a `status` word, one `action` at its foot, small `tools` in the top corner and `onOpen`, a chevron to the full view. An action or a tool given `copy` in place of `onSelect` copies through `CopyButton`. The label is set as written, at 12 px. New string `common.open`. The decision tree answers data, a headline number that does one thing, with ActionTile.
