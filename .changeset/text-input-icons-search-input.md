---
'@drizztdourden08/tessera': minor
---

`TextInput` and `NumberInput` take `start` and `end`: an icon at either end, sized to the control, that becomes a labelled button when it has `onClick`. `SearchInput` is a new primitive built on it, with a search icon, a clear button that keeps the focus, Escape to clear and `type="search"`; `SideNav`, `CommandPalette`, `FilterBar` and the `Select` search box use it. The `Combobox` clear button and the `DynamicInput` icons and actions draw through the same adornment. The `SideNav` chevron lines up with the first row, and the nav has the same space above its first row and below its last. See MIGRATION.md.
