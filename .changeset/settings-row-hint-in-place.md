---
'@drizztdourden08/tessera': minor
---

SettingsRow shows one line under its title: the description at rest, swapped in place for the row hint while the control is pointed at, or for the hint of the segment, option, toggle state, slider value or highlighted select option under the pointer, with no change in row height. `description` (or `noDescription: true`) and `hint` are required on every settings row and content row, and the search matches the hint. Compact rows keep a 40px minimum height and their wide inputs a 160px minimum width, from new tokens, and compact radio options drop their subtitles. Select takes `onActiveChange`, and RadioGroup options take a `hint`.
