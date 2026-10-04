---
'@drizztdourden08/tessera': patch
---

The Stepper sequence runs without a stall between its parts. The fill, the line and the ring each take a curve that hands its speed to the next, from the new tokens `--ease-step-fill`, `--ease-step-line` and `--ease-step-ring`, and the current circle starts breathing as its ring spreads. See MIGRATION.md.
