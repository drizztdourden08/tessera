---
'@drizztdourden08/tessera': minor
---

LogPanel's `onInput` may return `false` or a promise (resolving `false`, or rejecting) to keep the typed text in the field, a second Enter is ignored while a promise is pending, and `inputDisabled` with `inputPlaceholder` shows a disabled input row.
