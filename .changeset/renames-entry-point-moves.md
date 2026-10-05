---
"@drizztdourden08/tessera": patch
---

`RENAMES.json` lists each export that moved between entry points in a `moves` map per release, under its name after that release's renames: `"CopyButton": { "from": "primitives", "to": "composites" }`. It holds the 10 moves of 0.17.0 and the 55 of 0.20.0, and the `PixelWordmark` note leaves `removedExports`. The test of `RENAMES.json` checks that each moved name is exported from its new entry point.
