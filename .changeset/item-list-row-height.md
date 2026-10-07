---
"@drizztdourden08/tessera": patch
---

ItemList rows sit on one line again: each row is as tall as its name and meta, a note column such as not installed stays on that line, and rename and delete take no room until the row is hovered, focused or picked, then sit at its end. ListItemList takes `shape` for rows drawn through a component of the app's own, and ListItemRow gives a name or meta written as text a `title` with the full text.
