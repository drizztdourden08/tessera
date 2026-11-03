---
'@drizztdourden08/tessera': minor
---

A DynamicInput pattern slot may be optional: write a `?` after the type, such as `{seconds:number? 1..3600}`. It may stay empty, its placeholder is fainter, and `patternText` drops it with the space before it. A CommandInput pattern spec is ready with an optional slot empty, and `format(values)` gets that slot as undefined (an empty string for text) (I-88).
