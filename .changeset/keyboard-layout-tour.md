---
'@drizztdourden08/tessera': patch
---

New KeyboardLayout draws a full-size keyboard that highlights or presses keys by Shortcut names, and ShortcutTour walks a camera across it to teach a shortcut, key by key, then all together. Both draw every key and the mouse through Shortcut, which gains a state prop (idle, lit or pressed, easing between them like its loop) and a fill prop that stretches the caps to their box.
