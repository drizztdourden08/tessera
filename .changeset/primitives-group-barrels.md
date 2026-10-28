---
'@drizztdourden08/tessera': patch
---

The primitives barrel is split into group barrels, one folder per gallery group such as `layout-exports` and `inputs-exports`, and `src/primitives/index.ts` re-exports them. Every name is still exported from `@drizztdourden08/tessera/primitives` and the package root. `tessera new primitive` writes the export into the barrel of the chosen group.
