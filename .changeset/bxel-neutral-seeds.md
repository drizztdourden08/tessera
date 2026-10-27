---
"@drizztdourden08/tessera": minor
---

A palette can now set its neutrals with optional seeds: `--p-bg`, `--p-panel`, `--p-surface-fill`, `--p-sunken`, `--p-border`, `--p-border-strong`, `--p-chrome`, `--p-chrome-border` and the text steps `--p-text`, `--p-text-dim`, `--p-text-muted` and `--p-text-faint`; the title bar, status bar, toolbar dock and tool frame read the new `--c-chrome` role, and palettes that set none look the same as before. DocumentTabs takes `look="raised"` for tabs with a surface fill and a lifted selected tab, and `--document-tab-bg` and `--document-tab-bg-selected` set the tab fills for any look.
