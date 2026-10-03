---
'@drizztdourden08/tessera': minor
---

`Icon` takes `effect`, a small pop that lands every few seconds on a random point of the drawn shape: `twinkle`, `glint`, `ping`, `burst`, `dot` or `shimmer`, with `every`, `jitter`, `color` and `count`. The pops never change the size of the icon, pause off screen and in a hidden tab, and never show under reduced motion. The new `--duration-icon-pop` token sets their length. `SearchSpark` and `SEARCH_ICON_PATHS` are removed: draw `<Icon name="search" effect="twinkle" className="search-glass" />`. See MIGRATION.md section 56.
