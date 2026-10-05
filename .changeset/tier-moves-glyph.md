---
"@drizztdourden08/tessera": minor
---

`ShortcutList` and `CodeBlock` move to the composites and `Overlay` to the primitives, as the one dimmed backdrop that Drawer, DisabledOverlay, WindowGuideOverlay and ScreenLayer now draw with; `Overlay` takes `tone`, `blur`, `keepMounted`, `onClick` and `ref`. `StatRow` drops `copyable`: pass a `CopyValue` as the value, which now takes `text` for a string to copy that differs from what it shows, and any node as `value`. `Text.CodeBlock` is gone. `Floating` is no longer exported; apps use `Anchored`. Glyph drops the eighteen marks Icon already draws, and Tessera draws them with Icon. An Icon with a `label` is no longer hidden from screen readers.
