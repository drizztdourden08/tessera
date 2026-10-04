---
"@drizztdourden08/tessera": minor
---

`ActionBar` is new: the actions on one item in a single row. A `primary` action sits last and never folds; the others keep their order and, when the row runs out of width or past `keep`, the last ones move into a More `DropdownMenu`, with danger actions in their own group. A `danger` action takes the danger look and always asks first, in place, with the check and cross of `ConfirmIconButton`; `confirm` sets the question and the name of the check and makes any action ask. New strings `items.more`, `items.asksFirst` and `items.confirmQuestion`.
