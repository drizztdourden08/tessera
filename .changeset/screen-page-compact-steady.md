---
"@drizztdourden08/tessera": patch
---

ScreenPage's header no longer flickers between full and compact when the body barely overflows: it compacts only when the body still scrolls with the smaller header, and comes back only at the top.
