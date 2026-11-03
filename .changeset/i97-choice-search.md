---
'@drizztdourden08/tessera': minor
---

DynamicInput choice slots open their list on a click on the chip, and a second click closes it. The keyboard works as before. The list now sits under its chip with no gap on its right, and its rows line up with the section title. Two new choice arguments make a long list easy to use. With search, such as {player:choice @players search}, the slot is a text box that filters the options as you type, and Enter takes the first match. With free, the typed text is kept as the value when no option is picked, such as a player name the list does not have. The filter runs on a deferred query and long lists are windowed, so typing stays fast with thousands of options. Paste across slots works with both. New Storylite variant "Long searchable list" (I-97).
