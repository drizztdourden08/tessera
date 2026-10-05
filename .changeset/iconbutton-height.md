---
"@drizztdourden08/tessera": minor
---

IconButton is as tall as Button at every size: `md` is 39 px square, where it was 32 px, and `sm` stays 28 px, both from the `--control-h-md` and `--control-h-sm` tokens that Button now sets as its height too. An icon with no size of its own draws at 16 px in `md`. ActionBar drops its own rule for More.
