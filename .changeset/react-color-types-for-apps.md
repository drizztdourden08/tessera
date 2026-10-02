---
'@drizztdourden08/tessera': patch
---

Apps that typecheck Tessera's source no longer fail on the colour picker's `react-color` imports. The picker reaches react-color's ES files through the package's own `#react-color/*` imports, which carry their types, and `@types/react-color` is now a dependency.
