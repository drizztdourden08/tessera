---
"@drizztdourden08/tessera": patch
---

VolumeIcon in four steps, with waves that grow taller as the level rises. It draws one wave up to 25%, two up to 50%, three up to 75% and four above that, so 25, 50, 75 and 100% each look different; `VolumeStep` is now `0 | 1 | 2 | 3 | 4`. Every step makes the shown waves taller: each arc draws out from its middle toward its tips, to 60, 73, 87 and 100% of its length, and the change morphs over the same 390 ms on `stroke-dashoffset`, so the box never moves. The waves take `--c-volume-wave`, now set to `--c-primary` in place of `--c-primary-bright`; the speaker takes `--c-text`, white on the dark ground, in place of `currentcolor`; the X keeps `--c-danger`.
