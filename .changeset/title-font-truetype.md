---
"@drizztdourden08/tessera": patch
---

The title face ships a TrueType copy beside its WOFF2 files, `fonts/chakra-petch/chakra-petch-latin-600-normal.ttf` and `chakra-petch-latin-700-normal.ttf`, unpacked from the `.woff2` with the same glyphs, for tools that cannot read WOFF2 such as resvg; `exports` gains `./fonts/*`.
