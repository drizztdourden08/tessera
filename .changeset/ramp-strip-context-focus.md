---
'@drizztdourden08/tessera': minor
---

RampStrip takes `onStepContextMenu(index, event)`, called on a right click or the menu key on a step, with or without `swatchMenu`; when both are given the handler runs first and the menu opens unless it calls `event.preventDefault()`. With `selectionKeys` false the arrow, Home and End keys now move focus between the open steps without picking, and Enter or Space press the focused step (I-91, Bxel P-378).
