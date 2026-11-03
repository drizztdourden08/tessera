---
'@drizztdourden08/tessera': minor
---

The shared listbox of Select, Combobox and the DynamicInput choice slots draws only the rows in view once a list holds more than 200 options, so a list of thousands opens and scrolls at once. Spacers keep the full height for the slim scrollbar, group headings and the column header stay, and the active option is always drawn, so the arrow keys, Home, End and typeahead reach any row and `aria-activedescendant` always points at a drawn option. A hidden row with the longest label holds the width steady while the list scrolls. Lists of 200 options or fewer draw as before. `visibleRange` and `renderedIndices` now live in the data tier and are still exported from the same places (I-95).
