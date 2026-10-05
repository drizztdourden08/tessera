---
"@drizztdourden08/tessera": minor
---

`WidgetManager`, `WidgetGates` and `visibleLayoutOf` take `contextActive` as one flag or as a function that answers for each widget definition, typed `WidgetContextActive`. `DropdownMenu` items take `kind: 'confirm'`: the first press asks with Click again to and the label in the danger tone, the second runs it, and Escape, leaving or a timeout puts it back; `confirm` sets the words, from the new string `items.confirmAgain`. ConfirmIconButton, ActionBar, SettingsRow and the confirm item share one ask hook. WindowTitleBar actions with `bar: 'dropdown'` take `tone` and `effect`, drawn on the bar and in the folded menu.
