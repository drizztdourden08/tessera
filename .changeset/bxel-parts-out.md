---
"@drizztdourden08/tessera": minor
---

ReorderList and SwatchGrid are removed: a layers list and a palette are the Bxel app's own, and it builds them from Tessera's parts. The drag and keyboard reorder logic they shared is now public: `useReorderDrag`, `useMoveFocus`, `reorderStep`, `columnsOf` and `REORDER_ITEM_SELECTOR`, with their types. Build such lists on those hooks, `ColorSwatch`, `ListItemRow` and `IconButton`.
