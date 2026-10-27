---
'@drizztdourden08/tessera': minor
---

Status takes `dotSize="lg"` for an 8 px dot and `halo` for a soft ring in the tone around the dot.
Tag takes `dot` to lead the label with a small dot in the tone of the tag.
IconButton `tone` takes `info` and `accent`, beside `danger`.
Card takes `header`, any content for the header row in place of the title, subtitle and actions.
New TrackTable: a flat table whose columns take `fr` shares of the width and `drop` 1, 2 or 3 to hide under container queries as the table narrows. The breakpoints are the `--track-drop-1` to `--track-drop-3` tokens.
