---
'@drizztdourden08/tessera': patch
---

DockLayout corner handles are a 24 by 24 square at the panel corner, below the title bar, instead of a strip along the whole edge, so they no longer cover buttons and swatches in the panel. The widget title bar buttons are 24 px across, so they pass the axe target size check, and the title bar height and icon sizes stay the same.
