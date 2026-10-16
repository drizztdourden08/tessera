---
"@drizztdourden08/tessera": minor
---

ItemList deletes at once with an inline Undo: `undoDelete` keeps the row as Deleted with an Undo button for that many milliseconds, waits while the pointer or focus is on it, then calls `onDelete`; Ctrl+Z undoes the latest. `deleteKey` binds the Delete key on the focused row, and `rowActions` adds buttons of your own before rename and delete. `toast()` takes `onClose`, called once with `expired`, `dismissed`, `action` or `replaced`, so an undo window can follow the toast. `useNameEdit`, the rename logic behind ItemList, is exported.
