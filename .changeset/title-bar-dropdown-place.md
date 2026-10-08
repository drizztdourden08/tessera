---
'@drizztdourden08/tessera': patch
---

The SiteHeader profile menu and every WindowTitleBar dropdown action open on the side with room, under the end of their button when it sits in the right half of the window, and keep their natural width instead of being squeezed against the right edge. The SiteHeader link menu does the same. DropdownMenu with a trigger takes `align`: `start` by default, `end` or `auto`.
