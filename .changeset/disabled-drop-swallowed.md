---
"@drizztdourden08/tessera": patch
---

A file dropped on a disabled DropZone, or on a disabled or read only PathInput, is swallowed with the not allowed pointer, so Chromium no longer opens it in place of the app. No handler runs and no drop highlight shows.
