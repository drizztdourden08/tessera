---
"@drizztdourden08/tessera": minor
---

New composite ReorderList. It is a list the user puts in order by dragging the grip or with the keys, with a row of on and off icons on each item, such as visible and locked for the layers of a drawing. Describe the icons once in `toggles`, keep each item's state in its own `toggles`, and flip it in `onToggle`. Each icon is a button named by its label with aria-pressed. Arrow keys, Home and End move focus, Space or Enter selects, and Alt with Up or Down moves the row. Moves are announced. Exports: `ReorderList`, `ReorderItem`, `ReorderListProps`, `ReorderToggle` and `ReorderToggleState`.

The drag and the keyboard step of RowGrid now come from one shared reorder folder, `src/composites/reorder`, which also handles horizontal lists. RowGrid looks and behaves as before.
