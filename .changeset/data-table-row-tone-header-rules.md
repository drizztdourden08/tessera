---
'@drizztdourden08/tessera': patch
---

DataTable gains `rowTone(row)`, which gives the left edge of a row one of the Status tones, such as warning for a row that needs a look, with or without `rowState`. It also gains `headerRules`, which when false drops the vertical rules between the header cells; the rule still shows under the pointer so a column stays easy to resize (I-52).
