---
"@drizztdourden08/tessera": minor
---

tessera guide writes the part names of each scope to the module that `guide.parts` names, merged into TesseraApps, so an app no longer lists its views by hand, and tessera check reports the module once it falls behind; `usageExampleImports` from `@drizztdourden08/tessera/config` is a knip compiler that adds the imports of a usage example as re-exports, so a part only the example imports counts as used.
