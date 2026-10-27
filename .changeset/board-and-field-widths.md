---
'@drizztdourden08/tessera': minor
---

KanbanBoard has four opt-in layout props. `grip={false}` hides the drag grip, and the keyboard moves stay on a hidden grip button that shows a focus ring on the card. `foldable={false}` removes the fold chevron from every column. `columnHeight="fit"` sizes each column to its cards instead of the board height. `stack` stacks the columns when the board is under 420 px wide, through a container query. `Select`, `Combobox` and `TextInput` take `width`: `fit` sizes the control to its content and `narrow` fixes it at 220 px, and `SearchInput` takes the same prop. The package exports `KanbanColumnHeight`.
