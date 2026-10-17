---
"@drizztdourden08/tessera": minor
---

List rows start at the inset of a Button: one token, `--row-inset` (the Button inline padding, `--control-pad-md`, or `--control-pad-sm` in a compact scope), through one rule for ListItemRow, ItemList, CheckList, FileList, GroupTree and the options of Select and Combobox. The open Select, Combobox, DropdownMenu and ControlMenu read as one shape with their trigger, with no line at the join at any device scale, and the highlighted option fills the whole row. ListItemRow takes `media`, `mediaAspect`, `mediaWidth` and `nameAction`; ItemList takes `media` from `render` and `renameInline` to rename in place with a pen.
