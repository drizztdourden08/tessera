---
'@drizztdourden08/tessera': patch
---

A `Toolbar` number item with `showLabel` no longer squeezes its field to a sliver. The field was fixed at 96 px with the label inside it, so a long label left no room for the value. A labelled number now sizes to its label plus a field wide enough for its widest value, taken from `max`, `min` and `step`. The fit measure counts that width, and re-measures when `showLabel`, a bound, `step` or `suffix` changes, so a short bar folds whole items into More. A number without `showLabel` is unchanged.
