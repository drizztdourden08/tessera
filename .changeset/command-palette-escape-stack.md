---
'@drizztdourden08/tessera': patch
---

CommandPalette closes through the shared Escape stack at `dialog` while open, so Escape first cancels the confirm question of a row and closes the palette on the next press, wherever focus is. Escape in the search box with text clears the text first, as in every search box. Focus returns to where it was on close, in a frame too.
