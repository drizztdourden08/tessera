---
'@drizztdourden08/tessera': minor
---

Each brand has its own backdrop: `BRAND_FAMILY[app].backdrop`, built by `backdropGradientCss()` into `--brand-<app>-backdrop`, a blend of soft glows in the brand colours with no visible edge. `BACKDROP_GRADIENT` and `--brand-backdrop-gradient` are removed. `Hero` takes `brand` to pick its backdrop. `tokens.json` gives each brand its `backdrop`. `ScrollArea` holds the wheel only on an axis that has something to scroll, so a sideways ScrollArea no longer stops the page from scrolling. See MIGRATION.md.
