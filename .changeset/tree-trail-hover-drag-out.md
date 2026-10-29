---
'@drizztdourden08/tessera': minor
---

`Tree` takes `trail="hover"`, which fades the trail slot out at rest and shows it when the row is hovered, focused, holds focus inside it or is picked, so the row does not shift and Tab or an arrow into the row reveals the actions. It also takes `onDragOut(keys, event)`, which makes the whole row a native drag source for other widgets, with the count ghost of `useNativeDragGhost`. With `reorder` too, a plain drag leaves the tree and Alt with the drag reorders, as Alt with the arrows does. A new type, `TreeTrailShow`, is exported.
