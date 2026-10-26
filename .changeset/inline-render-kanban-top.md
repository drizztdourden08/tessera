---
'@drizztdourden08/tessera': minor
---

InlineEdit takes `renderValue` to draw its text when not editing, such as inline Markdown, and a click on a link inside it does not start the edit; Markdown takes `size="inline"` for compact text inside a card. KanbanBoard columns take `top`, a slot above the cards such as an inline add form, hidden when the column is folded.
