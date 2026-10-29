---
'@drizztdourden08/tessera': minor
---

ScrollArea takes `thumb`. With `thumb="auto"` on a slim area the thumb is hidden at rest and shows under the pointer, while the area scrolls and for a moment after (the new `--duration-scrollbar-idle` token), and while focus is inside it. It stays draggable with the same hit area, and reduced motion only shows and hides it. The default `always` keeps today's look. A slim area with nothing to scroll draws no thumb, and a test now covers it.
