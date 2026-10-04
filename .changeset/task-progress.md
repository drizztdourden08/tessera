---
"@drizztdourden08/tessera": minor
---

`TaskProgress` is new: the progress of one long job, a bar with its percent or a sweep while the length is unknown, the current line, a state word (running, done, failed, cancelled), the steps in a vertical Stepper, a danger Callout on failure and the output lines folded in a LogPanel of fixed height that a failed job opens. `JobDialog` is new: TaskProgress in a dialog with Cancel and Hide while the job runs and Close once it ends. `ProgressBar` takes `indeterminate`, and `Stepper` takes `complete`, every step done.
