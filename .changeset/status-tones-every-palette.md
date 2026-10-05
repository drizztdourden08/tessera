---
"@drizztdourden08/tessera": minor
---

Success, warning, danger and info mean the same thing in every palette. Each palette sets its own `--p-success`, `--p-warning`, `--p-danger` and `--p-info`, tuned to its surfaces and kept apart from its primary and secondary, and `data-palette="tessera"` now sets the Tessera seeds inside another palette. A success Toast reads `--c-success` where it read the secondary colour, so it is green in Tessera, Brock and Archipelia instead of grey or lilac, and every Toast draws its text in the `-bright` step of its tone on the `-dim` fill with a full tone border. Tessera's danger is a little lighter, `#ec6279`, so its text reaches 4.5:1 on its own tint. A cancelled TaskProgress bar is the neutral tertiary instead of the secondary. `tokens.json` lists the four status colours for each palette, a new test holds every status text at 4.5:1 and every icon or border at 3:1 in each palette, and the Status page shows the four tones in every palette.
