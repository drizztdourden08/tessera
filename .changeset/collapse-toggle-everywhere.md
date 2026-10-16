---
"@drizztdourden08/tessera": minor
---

Every panel that folds now folds with one button, CollapseToggle: the round chevron on the edge that SideNav already had, which points toward the panel's edge to fold it and away from it to unfold it. SidePanel, StudioLayout and ListDetailLayout use it in place of their panel icon buttons, and their folded rails look like the folded SideNav. SidePanel takes `rail` for what its folded rail shows, keeps its content mounted while folded, and works in a plain flex row for a page with a panel on each side.
