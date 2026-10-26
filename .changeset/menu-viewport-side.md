---
'@drizztdourden08/tessera': patch
---

Anchored popups, and so every DropdownMenu opened from a toolbar, flip to the other side of their button and then clamp inside the view with a small margin on all four edges, in the native and in the fallback placement. A Toolbar takes menuSide and the ToolbarDock slot hands it over, so the menu of a vertical toolbar opens beside it (right of a left bar, left of a right bar) with the same border, radius and animation as a menu from a top bar.
