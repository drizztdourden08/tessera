---
"@drizztdourden08/tessera": minor
---

`SaveBar` is new: the bar at the foot of an editor, with the save state (`clean`, `dirty`, `saving`, `saved` or `error` with its reason) and Save and Discard, drawn on the `ButtonRow` bar that the inline question of `MasterDetail` now shares. `RowGrid` moves from the gallery preview into the composites: a short list edited in place, a table when wide and cards when narrow. `MasterDetail` asks over the editor by default, `guard` going from `'dialog'` to `'inline'`. New string groups `saveBar` and `rowGrid`. See MIGRATION.md.
