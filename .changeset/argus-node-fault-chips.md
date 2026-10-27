---
'@drizztdourden08/tessera': minor
---

Five opt-in options for the Argus Node design; every default look stays the same. `Select`, `Combobox`, `TextInput` and `SearchInput` take `width="narrow-fill"`, the 220 px control that fills its row when the nearest container is under 420 px wide, set by the `--field-w-fill-below` token. Tabs takes `badgeFill="solid"` to draw the count as a solid Badge in its tone instead of the tinted one, and the package exports `TabBadgeFill`. Tag and Status take `reason`, a short cause drawn after the name in the tone while the name stays in the text colour. Markdown takes `idLinkTone`, a tone for the links made by `linkIds` apart from the web links, which keep `linkTone`. The DropdownMenu `select` item already draws its label above the Select, so it needs no option.
