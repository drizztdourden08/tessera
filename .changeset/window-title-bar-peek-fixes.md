---
"@drizztdourden08/tessera": patch
---

WindowTitleBar's peek calls `preventDefault` on the Escape it handles, so the host does not act on the same key. A concealed bar now sits on its own layer, `--z-title-bar` (120), above the floating panes, without the host needing `isolation: isolate`.
