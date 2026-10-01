---
'@drizztdourden08/tessera': patch
---

AboutPanel takes `heading`: `wordmark` (the default with a brand) or `title`, which keeps the brand mark but shows the app's own name. Menu shortcuts read `Mod` as Cmd on macOS and Ctrl elsewhere, accept key names such as Comma, Period and Plus, and leave out an unknown part with a dev warning. WindowTitleBar takes `onMenuOpenChange` so an app knows when its menu is open.
