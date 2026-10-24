---
'@drizztdourden08/tessera': minor
---

VirtualGrid takes `sections` instead of `items` and draws a collapsible header row over each section, with `collapsed`, `defaultCollapsed` and `onToggleSection`, and the keys move between headers and tiles.
VirtualGrid takes `scrollRef`, `bind` and `overlay` for a marquee, and every tile carries `data-marquee-key` set to its key.
VirtualGrid takes a `ref` with `scrollToIndex(index, align)`, and `scrollTopForSpan` gives the scroll offset of a row of any height.
VirtualGrid takes `tileWidth` and `tileHeight` for tiles that are not square, and `useVirtualWindow` takes `readMetrics` and `rangeOf` for rows of more than one height.
