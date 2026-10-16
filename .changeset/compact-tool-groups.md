---
"@drizztdourden08/tessera": patch
---

ToolGroups takes `compact`, and StudioLayout takes `compactToolbar`: the tools sit in one row of small controls with a line between groups and no label shown above them. Each group keeps its name as `aria-label`, and every control inside without its own size draws at sm through a compact DensityScope. The toolbar of a StudioLayout editor is then 45 px high, one 28 px control and the frame padding, where the labelled toolbar is 65 px. Left out, the markup is the same as before.
