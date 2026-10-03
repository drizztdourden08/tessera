---
'@drizztdourden08/tessera': minor
---

`FullScreenLayer` keeps one gap around its card, equal on all sides, that follows the room it has: a 2xl gap plus 5% of the smaller side on a large layer, stepping down to a minimum that always leaves room above the floating switch, and to no gap under 480 px wide or 440 px high. The padding moves to a new `.fullscreen-layer__inset` wrapper.
