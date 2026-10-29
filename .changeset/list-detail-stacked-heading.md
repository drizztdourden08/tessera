---
'@drizztdourden08/tessera': patch
---

`ListDetailLayout` no longer leaves a tall empty band between the list heading and the list when it stacks under 768 px of its own width. The list pane now sizes its heading row to the heading and gives the content row the rest, so the list starts right under the heading. The side by side layout is unchanged.
