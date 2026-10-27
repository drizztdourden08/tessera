---
'@drizztdourden08/tessera': minor
---

A widget and a PanelContainer take a `sublabel`: a muted label right after the title in the title strip. WidgetDefinition and WidgetTab take `sublabel`, which the title bar of a single widget or of the open tab draws; the tab chips of a tabbed pane never show it. The sublabel has its own ellipsis and shrinks first, so the title only shrinks once the sublabel is gone, and when either is clipped the full text shows in a Tooltip. Both share one title strip part, so the look is the same.
