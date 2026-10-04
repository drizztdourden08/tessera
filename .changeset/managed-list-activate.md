---
"@drizztdourden08/tessera": minor
---

`ManagedList` takes `onActivate`, run on a click, Enter or Space on a row: with it set, the arrow keys, Home and End move only the focus, with one Tab stop on the focused row, and `selectedId` still marks the current item. It also takes `actionVisibility` from `ListItemRow`, `'hover'` by default, so rename and delete are on every row: always on the picked row, and on the others under the pointer or with focus. Without `onActivate` the arrow keys move the selection as before, and `MasterDetail` keeps that. `ListItemRow` and `ConfirmIconButton` take `tabIndex`. The ManagedList page shows profiles where the arrows move and Enter switches.
