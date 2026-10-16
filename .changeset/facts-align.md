---
"@drizztdourden08/tessera": minor
---

StatRow and FactsPanel take `align`, `start` or `end`, typed `StatRowAlign`. `align="end"` sets each label on the left and its value on the right edge of the row or panel, past the 512 px a row stops at, one fact per row in every FactsPanel layout; `start` sets the value right after its label. Without `align` each layout looks as before. FactsPanel passes it to its StatRows and no longer copies their alignment rules.
