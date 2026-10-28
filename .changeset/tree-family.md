---
"@drizztdourden08/tessera": minor
---

`Tree` is a new virtual tree of any depth. It draws only the rows in view, so ten thousand rows open at once, and it has the tree roles and keys: arrows, Right and Left to fold, Home, End, a typed letter and the star for all siblings. `selection` picks one row or many through `useSelectionModel`, `getChildren` with `isBranch`, `onLoadChildren` and `loadingKeys` load a folder when it opens, and `filter` keeps the matches with the folders above them. `reorder` drags rows to a gap or into a folder with `DragGhost`, shows the into mark only where `maxDepth` and `canDrop` allow the drop, opens a closed folder after a hold, limits the depth with `maxDepth`, and Alt with an arrow moves rows in and out of a parent; each move is announced and given to `onMove` as the keys, the parent and the index. The row has three slots, `renderLead`, `renderLabel` and `renderTrail`, and no toggles of its own.

`GroupTree` is rebuilt on `Tree` and keeps its props and behaviour. Its rows now use the classes of `Tree`, so a story that targeted the group row classes targets `tree__row`.

`MillerColumns` shows nested items as side by side columns, each a `VirtualList`, with one shared `selection`, a `path` the app may own, Right and Left between columns and `onOpen` for a leaf. `useToggleSweep` lets the user press a toggle and drag over the others to set them all to one value, committing once through `onEnd` with every key it touched, showing the keys reached so far in `touched` and `value`, and calling `onSet` for each key only when the app wants a live change. `InlineEdit` takes `dense` to fit a 24 px row, with the message of `validate` on one line beside the field.
