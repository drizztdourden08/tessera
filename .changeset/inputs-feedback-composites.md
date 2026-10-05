---
"@drizztdourden08/tessera": minor
---

`RetryButton`, `CommandInput`, `PasswordInput`, `TagInput`, `Toast` with `ToastContainer`, and `PathField` move from the primitives to the composites, since each carries behaviour; `@drizztdourden08/tessera/composites` exports them in place of `/primitives`, and the root import, props and look are unchanged. `PathField` is renamed `PathInput`, with `PathInputProps` and the `path-input` classes. RetryButton and the WindowTitleBar status share one ticking clock, and PathInput and DropZone share one drag tracker, so DropZone ignores a drag with no files and takes no drop while disabled. `Center` is back as a shortcut over `Flex` with its own page and usage, and `BrandScene`, `placePiece` and `groupNode` are no longer exported.
