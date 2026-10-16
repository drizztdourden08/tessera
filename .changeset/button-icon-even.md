---
"@drizztdourden08/tessera": patch
---

A Button with `icon` or `iconEnd` has the same padding on the icon side as on the label side, in every variant and size: the icon slot no longer adds a 20 px box around a 16 px glyph, an Icon passed without a `size` takes the size of the button (16, 14 or 12 px for `md`, `sm` and `xs`), and the gap between icon and label is 8, 6 or 4 px. An Icon given a `size` keeps it. Heights do not change.
