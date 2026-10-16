---
"@drizztdourden08/tessera": patch
---

The unfilled part of a Slider track draws in `--c-border-strong`, the colour of its scale ticks, in place of `--c-surface`, so it shows on a card, a dialog, a drawer or any panel drawn in `--c-surface`, where it was missing. A Tooltip, and with it every disabled reason on tabs, segments, radio options, chips and Select options, now closes on pointer leave, blur, Escape or a click elsewhere; a click shows it but never holds it open, and only keyboard focus keeps it open with the pointer away.
