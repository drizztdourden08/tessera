---
"@drizztdourden08/tessera": patch
---

DocumentTabs now draws a tablist whose direct children are only the tabs, with the close buttons in a layer after it that sits over each tab's end, so `[role=tablist] > [role=tab]` lookups work and aria-owns is gone. A Stepper step now names itself with exactly its visible text, the digit first, and says done or needs attention through a described note instead of in the name.
