---
'@drizztdourden08/tessera': patch
---

WindowTitleBar draws its minimize, maximize, restore and close buttons at Brock's size again, with the filled 12 unit caption paths. ListItemRow takes `actionVisibility` (`hover` by default, or `always`), and ProfilePicker uses `always` so the delete button stays in view. ProfilePicker fits its content up to 640 px instead of filling the width. `Small` takes the status tones (success, warning, danger, info) as well as dim and muted, for short status lines.
