---
"@drizztdourden08/tessera": minor
---

`FileList` is new: one row per file in a framed list, with a type icon from the extension (or `icon`), the name cut short with an ellipsis, the size and the date it changed written with the DataTable `bytes` and `datetime` formats, and Open and Show in its folder icon buttons with tooltips when `onOpen` and `onReveal` are passed; the columns line up across rows, `empty` says why there are no files yet and `dense` tightens the rows. New strings `items.files`, `items.noFiles`, `items.openFile` and `items.revealFile`.
