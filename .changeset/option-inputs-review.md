---
"@drizztdourden08/tessera": minor
---

CodeBlock takes `editable`, `value` and `onChange` to edit text in any language over its highlighting, with `invalid` and `problemLine` to show what the app's own check found, so JsonInput and its JSON reader are removed and an app checks JSON with `JSON.parse`. NamedRange is removed for Slider with `labels` at the named values and `input`, and Slider now takes the id and label of its Field or FormRow. SetPicker is removed for Combobox with `max` and `values`, which draws the picks as removable tags. KeyValueEditor lays each row out as a grid, so a free name keeps its width beside a text or select value, and its rows keep their ids when the app hands back a reordered value.
