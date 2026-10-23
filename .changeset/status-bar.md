---
"@drizztdourden08/tessera": minor
---

New composite StatusBar, the thin bar at the foot of an editor window. It shows a row of labelled readouts, such as cursor position, zoom, current colour, sprite size, layer and frame. Each item has a label and a value, and can take an icon, a colour swatch, a tone and a hover title. An item sits at the start or the end of the bar. Numbers use tabular figures, so a cursor position does not jitter, and long text ends in an ellipsis. On a narrow bar, items with a priority from 1 to 3 drop out, 3 first. The bar is a labelled region and not a live region, so a moving cursor is never announced. It adds the tokens status-bar-h and status-bar-swatch.
