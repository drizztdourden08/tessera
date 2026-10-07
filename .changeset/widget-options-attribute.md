---
"@drizztdourden08/tessera": minor
---

The WidgetOptions panel and every panel it opens, such as Shortcuts, carry `data-widget-options`, exported as `WIDGET_OPTIONS_ATTRIBUTE`, so an app can tell them from any other ControlMenu; ControlMenu gains `panelData`, data attributes it sets on its panel and on each sub-panel.
