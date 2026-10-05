---
"@drizztdourden08/tessera": minor
---

CommandInput draws its line with Combobox: focus shows the border and soft halo of a Combobox field with no outline, and the open list of commands joins the field as a Combobox list does. CommandInput keeps the mono face, the prompt mark, Tab or Right completing, Enter sending, the history, Escape clearing and the key hints, and its props no longer extend TextInputProps. Combobox gains `freeText`, `query`, `start`, `listLabel` and an `onKeyDown` that runs before its own keys.
