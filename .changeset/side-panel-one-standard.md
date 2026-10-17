---
"@drizztdourden08/tessera": minor
---

SidePanel is the one side panel standard. Its body sits on the sunken surface in place of the raised one. A line runs down its inner edge in every state, with the CollapseToggle on it, set in the row of the heading so it lines up whatever the heading height; `resizable` adds the grip and the drag, and `resizable={false}` keeps the line and the toggle. Folded, it is a 60 px sunken rail that shows the `actions` at its top level with the toggle, the title written sideways (reading up on a left panel and down on a right one), then the `rail` icons. A glow around a rail icon now spreads past the rail: only a rail too long to fit scrolls and clips. StudioLayout's panels follow, and ListDetailLayout's folded rails take the same sunken look and reading direction. The `side-panel--overhang` and `side-panel__frame` classes are gone, and `side-panel__line` is new.
