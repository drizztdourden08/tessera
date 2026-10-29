---
'@drizztdourden08/tessera': minor
---

`DataTable` takes `rowRef(row, key)`, which returns a ref for the element of that row. The host gets each drawn row element, so a row can become a source of its own drag system, not only of the browser drag and drop of `rowDragData`. The ref may be a callback ref or an object ref. Rows of a long table mount and unmount as they scroll, and the ref receives the element on mount and is released on unmount. Without `rowRef` nothing changes.
