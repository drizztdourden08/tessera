---
"@drizztdourden08/tessera": minor
---

StudioLayout, a new composite, is the frame of a studio screen: a raised bar with the title, labelled action groups and a hint line, a list on the left, an editor with its toolbar on the top edge, and an inspector on the right, stacked below 768 px of its own width. It is drawn from three new shared parts: SidePanel, a raised side panel with a heading that folds to a rail and is dragged wider; ToolFrame, a sunken frame with a toolbar on its top edge; and ToolGroups, tools in groups under small labels. ListDetailLayout now folds to the same rail as SidePanel, and LogPanel is a ToolFrame, both with the same look; ListDetailLayout's rail label class is now `pane-rail__label`, and LogPanel's `log-panel__toolbar` class is gone.
