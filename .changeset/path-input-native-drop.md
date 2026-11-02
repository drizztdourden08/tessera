---
'@drizztdourden08/tessera': patch
---

`PathInput` has a new `nativeDrop` prop, true by default. Set it to false when the app handles file drops itself. The box then attaches no drop handling, so the drop reaches the app first and no error flashes for a path the app has not vetted yet. The default is unchanged.
