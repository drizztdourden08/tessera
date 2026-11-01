---
'@drizztdourden08/tessera': minor
---

The Tree ref handle gains `scrollToTop()`, which scrolls the tree back to its first row. `scrollToKey` does nothing for a key the filter hides, so call `scrollToTop` after a filter change to bring the host back to the top (P-250).
