---
"@drizztdourden08/tessera": minor
---

`ValidationSummary` is new: what blocks a save, listed above a form in a danger or warning `Callout` inside an alert. The title counts the problems unless `title` is given; each problem with a `field` is a link that calls `onFocusField`; the first `max` (4) show and "and N more" shows the rest and moves focus to the first one it revealed. New strings `items.fixBeforeSaving` and `items.andMore`.
