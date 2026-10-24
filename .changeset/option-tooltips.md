---
"@drizztdourden08/tessera": minor
---

SegmentedControl and ToggleGroup options take a `tooltip` with a `description` and a `shortcut`, and the control takes `tooltipPlacement`, so icon-only options get a name on hover.

The tooltip body moves from Toolbar into the new primitive `TooltipContent`, and the shortcut parser becomes `shortcutKeys` in Shortcut.
