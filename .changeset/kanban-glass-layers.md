---
'@drizztdourden08/tessera': minor
---

KanbanBoard draws glass layers: lane, group frame and card are slightly transparent, each with a subtle tint from the column accent. The group frame borders run unbroken and the group bar spans the full frame width. New `cardTint` prop (`(card) => TagCategoryColor | undefined`) tints a card, and the `renderCard` frame argument carries `tint`.
