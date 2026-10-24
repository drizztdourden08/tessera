---
"@drizztdourden08/tessera": minor
---

DataTable takes `defaultExpanded`, a list of group keys or a function, to choose which groups start open. It draws only the rows in view from `virtualizeFrom` rows (200 by default), so a group of hundreds of rows stays fast.
