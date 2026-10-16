---
"@drizztdourden08/tessera": minor
---

A search box, a Select or a Combobox fits in a toolbar, and StudioLayout stacks only when its columns do not fit. TextInput, SearchInput, Select, NativeSelect and Combobox take `grow={false}`: the control keeps the set width `--field-w-inline` (256 px), shrinks to `--field-w-inline-min` (160 px) and sits on one line with the other tools in a ToolFrame toolbar or ToolGroups. StudioLayout stacks its columns when the open side panels, the folded rails and `editorMinWidth` (192 px when left out) do not fit side by side, in place of a fixed 768 px of its own width, so a studio beside a ListDetailLayout list keeps its columns and the editor its full height on an ordinary window.
