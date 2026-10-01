---
'@drizztdourden08/tessera': patch
---

Menus grow to fit their items: the hamburger menu, anchored menus and submenus are capped only by the room to the window edge and scroll past it, where they used to stop at the 288 px of a Select list. `useListboxDrop` takes `fit` for this; Select and Combobox keep their cap. See MIGRATION.md.
