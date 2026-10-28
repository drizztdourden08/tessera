---
'@drizztdourden08/tessera': patch
---

Holding Alt no longer remounts the content of a docked widget. A peeking Widget keeps its body mounted and only collapses it with CSS, so focus stays in the control and Alt with an arrow key reaches it. `useDockKeys` also ignores Alt pressed while focus is inside widget content.
