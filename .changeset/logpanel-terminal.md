---
'@drizztdourden08/tessera': minor
---

LogPanel takes `ansi` to draw colour and style escape codes in its lines with the new `--c-term-*` tokens, `follow` to keep the end in view until the reader scrolls up, and `onInput` with `prompt` for a stdin row that walks the history of what was sent with Up and Down. The `--c-term-*` colours follow every palette, and escape codes that are not colour or style are stripped.
