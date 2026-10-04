---
'@drizztdourden08/tessera': patch
---

A Button leaving `loading` shows its label at once, even in a window that is not painting. The label now sits in a `.btn__label` wrapper (`display: contents`, so layout is unchanged) that is hidden with `visibility` while the spinner shows, instead of turning the button's text colour transparent, which started a colour transition that never ran in hidden windows.
