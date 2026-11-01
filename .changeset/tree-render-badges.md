---
'@drizztdourden08/tessera': minor
---

`Tree` takes `renderBadges`, a row slot between the label and the trail that is always shown. `trail="hover"` now hides only `renderTrail`, so status badges stay visible at rest while actions wait for hover, focus or a picked row. The row does not shift when the actions show. Without `renderBadges` nothing changes.
