---
"@drizztdourden08/tessera": minor
---

ScreenWindow takes `header`, which makes a ContentHeader the top edge of the window in place of the title bar, with the close button at the end of its actions; the title bar stays the default. UtilityScreen is laid out as rotp's update dialog, with the status in that header at the window level and no card inside: one column, the report button over a rule with an optional `report.footnote`, then the actions. `title` is gone: `status.title` names the window. InfoScreen drops the page header and its `icon`, `heading` and `backdrop`: its window keeps the title bar and the reading column scrolls under it.
