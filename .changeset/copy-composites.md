---
"@drizztdourden08/tessera": minor
---

`CopyButton` and `CopyValue` move from the primitives to the composites, since both write to the clipboard and keep a Copied state on a timer. `@drizztdourden08/tessera/composites` now exports them and their types in place of `@drizztdourden08/tessera/primitives`; the root import, props, classes and look are unchanged. Their gallery pages move to Composites · Actions and Composites · Content. `useCopy` stays beside `TesseraProvider`.
