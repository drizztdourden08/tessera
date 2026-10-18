---
"@drizztdourden08/tessera": minor
---

One pane edge for SidePanel, StudioLayout, ListDetailLayout and SplitPane: the same thin line, the round fold button beside the line with a 4 px gap, and the same folded rail. Every pane resizes (`resizable` is removed from SidePanel and ListDetailLayout), and pulling a pane about 32 px narrower than its minimum folds it to its rail while dragging the rail outward opens it; the arrow keys at the end of the range do the same. The highlight on the line is a slight brighten from `--c-border-strong` to `--c-text-muted`, with no gold and no glow. `ResizeHandle` takes `fold` in place of `onCollapse`, `look`, `children` and `onClick`, and `SplitPane.snapAt` becomes `collapsible`.
