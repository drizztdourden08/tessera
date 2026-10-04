---
'@drizztdourden08/tessera': minor
---

Stepper: going back plays the forward sequence in exact reverse at 0.6 times its length, one step at a time. A jump over several steps fills every passed circle and spreads its border at once, draws the lines in one sweep, then spreads the border of the step it lands on; Skip to Review across six steps now takes 1.6 s instead of 6.8 s. A done circle flips its number over to a check (`doneIcon`, on by default; `false` keeps the number), and each step can pick its own icon. A step, or the whole Stepper, can take any Tessera tone or tag colour with `tone`, which colours its fill, border, glow and the line arriving at it. New motion tokens: `--duration-step`, `--duration-step-flip`, the `-back` durations and easings, and the `skip` durations and `sweep` easings.
