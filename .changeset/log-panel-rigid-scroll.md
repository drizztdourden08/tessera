---
'@drizztdourden08/tessera': patch
---

`LogPanel` scrolls inside a rigid `ToolFrame`: its scroll box and list now take `flex: 1 1 0`, so their height is set by the frame and not by the rows (I-99, Archipelia P-387).
