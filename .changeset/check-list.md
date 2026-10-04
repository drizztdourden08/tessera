---
"@drizztdourden08/tessera": minor
---

`CheckList` is new: the results of a list of checks, such as a connection test. Each check has a `state` (`pass`, `warn`, `fail`, `pending` or `skip`) drawn from one `defineStatuses` table: an icon and a tone, a spinner while pending and a grey ring when skipped, a `detail` line and an optional `action`. The counts on top add up passed, advice, failed and checking in a status region, after an optional `summary`; `compact` draws one line per check with no box. New strings `items.checks`, `items.checkPassed`, `items.checkAdvice`, `items.checkFailed`, `items.checkChecking`, `items.checkSkipped` and `items.checkCount`.
