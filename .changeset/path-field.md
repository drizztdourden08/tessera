---
"@drizztdourden08/tessera": minor
---

`PathField` is new: a file or folder path the user can type, drop from the desktop or pick through the app's own dialog with Browse, all in the same field. A drop shows a dashed target, `kind` and `accept` turn away a folder, a file or a wrong ending with a reason, and `resolvePath` reads the full path of a dropped file. A long path is cut in the middle so the file name stays in view, and Copy, Reveal (`onReveal`) and Clear sit at the end; read only keeps Copy and Reveal.
