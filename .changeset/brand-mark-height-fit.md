---
'@drizztdourden08/tessera': minor
---

`BrandMark` and `Logo` take `fit="height"`, which makes `size` the height of the mark and lets the width follow the mark's own shape, so a wide mark such as Argus's is no longer shrunk into a square. Two new sizes, `h26` and `h39`, are 26 and 39 px tall; the default `fit="square"` is unchanged. A new scale token, `--size-22`, is 22 px.
