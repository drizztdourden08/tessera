---
'@drizztdourden08/tessera': minor
---

Stepper: going back plays the forward sequence in exact reverse at 0.6 times its length, one step at a time. A jump over several steps plays the full sequence for each step in turn at 0.4 times the forward pace; Skip to Review across six steps now takes 2.7 s instead of 6.8 s. A done circle flips its number over to a check (`doneIcon`, on by default; `false` keeps the number), and each step can pick its own icon. A step, or the whole Stepper, can take any Tessera tone or tag colour with `tone`, which colours its fill, border, glow and the line arriving at it. New motion tokens: `--duration-step`, `--duration-step-flip`, the `-back` durations and easings, and the `skip` durations.
