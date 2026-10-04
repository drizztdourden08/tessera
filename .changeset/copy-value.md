---
"@drizztdourden08/tessera": minor
---

`CopyValue` is new: a value the user often copies, such as an address, a seed or a key, with a copy button at its end, `mono` and `truncate` (`end` or `middle`). `CopyButton` is new: the one copy button, icon only or with its word, that turns to a check, reads Copied for two seconds and announces it. LogPanel and CodeBlock copy through `CopyButton`, and `useCopy().copy` resolves to whether the copy worked.
