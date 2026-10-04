---
"@drizztdourden08/tessera": minor
---

`RetryButton` is new: a small Retry button for a failed step, such as a lost connection. `retryAt` counts down to the next automatic try in a line before the button (Next try in 4 s), the button then reads Retry now, `attempt` and `attempts` add Try 2 of 5, and `retrying` shows a spinner. The app keeps the timer and starts each try. New strings `common.retry`, `retryNow`, `nextTryIn`, `tryOfIn`, `tryOf`, `waitSeconds` and `waitMinutes`.
