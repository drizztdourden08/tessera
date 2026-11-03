---
'@drizztdourden08/tessera': minor
---

`SidePanel` gains `railSize`, `'default'` or `'slim'`. A slim folded rail is only the dashed line and its chevron, `--side-panel-rail-slim-w` wide, with no title, action or icons. `PaneRail` takes the same `size` in its `rail` prop. `LogPanel` side filters now fold to the slim strip, and the lines beside the filters keep an inline gutter of the new token `--pane-edge-overhang` (half of `--collapse-toggle-d`), so the chevron no longer covers the time of a row. In `Widget`, tab chips are now an inline flex row, so the icon sits level with the label and a small gap separates them (I-93).
