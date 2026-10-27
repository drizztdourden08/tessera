---
'@drizztdourden08/tessera': minor
---

Four composites gain opt-in options, and every default stays. TrackTable takes `onRowClick(row)` to make each row a focus target that Enter and a click use, `rowDetail(row)` to draw a full width row under its row, and `rowTone(row)` to tint a row with the names of the DataTable `rowState`. InlineEdit takes `look="link"` for a dashed underline in italic. WindowHeader takes `stackNarrow`, which moves the close button into a tools row under the title when the header is under 420 px, set by the `--window-header-narrow` token. MarkdownEditor takes `toolbarEnd`, a node drawn at the right end of the toolbar. The package exports `TrackRowTone`.
