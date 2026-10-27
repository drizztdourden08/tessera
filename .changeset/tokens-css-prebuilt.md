---
'@drizztdourden08/tessera': patch
---

The `tokens.css` export is now a flat pre-built file at the package root, with every import inlined in order and the font paths rewritten to the package fonts. It holds the same rules as before, so an app's dev server no longer follows an import chain to load it.
