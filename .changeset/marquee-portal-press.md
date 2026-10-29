---
'@drizztdourden08/tessera': patch
---

`useMarqueeSelect` starts a drag only from a press inside its box. A press that bubbles through a React portal, such as a ContextMenu opened from a tile, no longer starts a marquee, so the menu item gets its click.
