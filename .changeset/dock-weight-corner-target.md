---
'@drizztdourden08/tessera': minor
---

WidgetDefinition takes dockWeight and DockPlace takes weight, so a widget that joins an edge sizes its share of the column by weight instead of 1/n, and defaultDockedSize now also resizes the column it joins. The DockLayout corner handles keep a thin line but have a 24 px hit area that starts below the title bar, so they no longer crowd the title bar buttons.
