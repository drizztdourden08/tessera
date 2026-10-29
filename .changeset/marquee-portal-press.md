---
'@drizztdourden08/tessera': patch
---

`useMarqueeSelect` starts a drag only from a press inside its box and outside any menu, dialog, listbox or tooltip in it. A press on a ContextMenu opened from a tile, drawn in place or through a portal, no longer starts a marquee, so the menu item gets its click.
