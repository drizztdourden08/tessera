---
"@drizztdourden08/tessera": minor
---

ControllerLayout, StickPlot and PressedGrid are removed: the controller feature is a Brock plugin, and it builds its live parts there. Tessera keeps the plain parts: `ControllerSilhouette` with its paths, anchors and view box, `InputIcon` and the input icon sets. Build a live layout on those.
