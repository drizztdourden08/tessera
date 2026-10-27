---
"@drizztdourden08/tessera": minor
---

A palette can now set its neutrals with optional seeds: `--p-bg`, `--p-panel`, `--p-surface-fill`, `--p-sunken`, `--p-border`, `--p-border-strong`, `--p-chrome`, `--p-chrome-border` and the text steps `--p-text`, `--p-text-dim`, `--p-text-muted` and `--p-text-faint`, and the title bar, status bar, toolbar dock and tool frame read the new `--c-chrome` role. The Bxel palette uses them for its dark grey look and swaps primary and secondary, and palettes that set none look the same as before.
