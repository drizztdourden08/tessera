---
"@drizztdourden08/tessera": minor
---

ManagedList, MasterDetailLayout and MasterDetail are renamed into one family: `ItemList`, the list of the user's items; `ListDetailLayout`, the two panes; and `ListDetail`, an ItemList beside an editor that asks before unsaved edits are lost. Their props types and classes follow, and RENAMES.json lists each one. The list pane folds to a rail for more room to edit, from a button at the top of the divider or Enter on it, held by the part, by `storageKey`, or by the app with `collapsed` and `onCollapsedChange`. The list pane draws on the sunken surface and the detail pane on the surface, and a SaveBar last in the detail sits flush with its foot. `detailEmpty` is removed: no `detail` means nothing is picked, and `emptyDetail` replaces the default placeholder in the layout. ListDetail passes every layout prop through, and the stored width reads and writes through the shared storage helpers.
