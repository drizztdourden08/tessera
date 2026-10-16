---
"@drizztdourden08/tessera": patch
---

DockLayout starts a drag from a press on the icon inside a drag handle. It used to ignore any press whose target was an SVG element, so pressing the grip icon of the main view started nothing; it now finds the handle from any element inside it, SVG included, and a press on a button inside a handle still stays a click. The widget grip no longer needs its icon to let presses through.
