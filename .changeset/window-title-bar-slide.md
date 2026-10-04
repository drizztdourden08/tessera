---
'@drizztdourden08/tessera': minor
---

WindowTitleBar slides instead of folding. A bar item that hides as the window narrows slides out towards its end of the bar while it fades, and slides back in the same way; the items beside it glide into the freed space. The concealed bar slides down from the top edge when the pointer nears it, at full height, instead of growing from zero height. A status action shows its status as plain text in its tone, with no pill, and the text swells from its centre with Emphasis when it appears. The bar now also fits right to left layouts. `windowGroups`, `windowGroup` and `onWindowGroupChange` add a Window group radio sub-menu to View, None first. Emphasis `pulse` and `loop` stop animating under reduced motion.
