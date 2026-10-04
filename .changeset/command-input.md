---
"@drizztdourden08/tessera": minor
---

`CommandInput` is new: a command line in the mono face with a prompt mark and a Send button. Enter sends the trimmed text through `onSubmit` (return `false` to keep it), Up and Down walk the history and bring back the draft, and Escape clears the line or passes on when it is empty. The history comes from `history` or is kept by the input, in local storage with `storageKey`; `actions` holds quick commands beside the key hints. New strings `common.send`, `command`, `history` and `clear`.
