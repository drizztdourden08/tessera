---
"@drizztdourden08/tessera": minor
---

Every palette sets a dark gradient pair from its own hues, `--p-gradient-dark-from` and `--p-gradient-dark-to`, read as `--c-gradient-dark-from` and `--c-gradient-dark-to` and listed in `tokens.json` as `gradientDarkFrom` and `gradientDarkTo`. `splash.css`, and so `Splash`, paints it behind the page, from `--look-dark-from` and `--look-dark-to` when a page sets them. The detail and the version of the splash use `--c-text-dim`, so every text, border and bar of the splash reaches WCAG AA in each palette, which a new test checks.
