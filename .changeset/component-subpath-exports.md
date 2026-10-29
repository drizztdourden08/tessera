---
'@drizztdourden08/tessera': minor
---

Every component folder has an import path of its own: `@drizztdourden08/tessera/primitives/Button` and `@drizztdourden08/tessera/composites/DataTable`, and the same for a group barrel such as `/primitives/layout-exports` or a kit such as `/composites/selection`. A test file or a small module that imports one component loads that component and what it uses, not the roughly 5000 modules of the full barrel. `KeyboardLayout`, `LogPanel`, `ShortcutTour` and `SplitPane` import their primitives from the primitive folders instead of the primitives barrel, so each loads fewer modules. The existing import paths work as before.
