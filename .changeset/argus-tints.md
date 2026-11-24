---
'@drizztdourden08/tessera': minor
---

RecordCard takes a `tint` prop (`TagCategoryColor`) that gives the card a subtle tinted surface and border on every density. KanbanBoard takes a `groupAccent` prop (`(groupId) => TagCategoryColor | undefined`) that tints the frame and bar of one group with its own colour over the lane tint. RecordHeader and RecordCard take `menuOnHover`, which hides the menu slot until hover or focus inside (always shown on touch) without moving the row.
