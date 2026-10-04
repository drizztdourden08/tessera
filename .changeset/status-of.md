---
"@drizztdourden08/tessera": minor
---

`defineStatuses` and `StatusOf` are new: a kind of state is declared once as a typed table of keys, each with a label, a tone, and an optional pulse and icon, and `StatusOf` draws the Status of a key from it, with a fallback for a value not known yet.
