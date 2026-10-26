---
'@drizztdourden08/tessera': minor
---

ContextMenu now returns focus to its opener after any close, including when the parent sets `open` false, and leaves focus alone when the user clicked into another focusable element. Menu items take `data` (data attributes) and `ariaDescription`, passed to the item, slider and sub-menu trigger.
