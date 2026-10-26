---
'@drizztdourden08/tessera': patch
---

PanelContainer takes a fill prop, and ListDetailLayout sets it when listScroll is false, so a DataTable in the list pane fills it and scrolls on its own instead of overflowing.
