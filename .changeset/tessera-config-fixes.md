---
'@drizztdourden08/tessera': patch
---

`tessera.config.json` lookup stops at the top of the repo (`.git` or `pnpm-workspace.yaml`). Inside an `apps` entry, the default views folder and theme file come from the app's own folder. The standards extension reads the config when the lint runs, from the root or package the factory passes; it gives `primitivesGlobs` for primitives only, and a broken config is a structure finding instead of a load error.
