---
"@drizztdourden08/tessera": patch
---

`tessera guide` and `tessera check` run from inside an app keep each part folder in the parts file of the config that names it, so the root's design parts stay in the root's `guide.parts` file and a guide run followed by a check is clean from the root and from each app.
