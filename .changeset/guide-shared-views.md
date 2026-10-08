---
"@drizztdourden08/tessera": patch
---

`tessera guide` and `tessera check` take a views folder shared by several apps, listed in the root's `parts.views` and in each app's own: its parts count once and go once into the root's `guide.parts` file, from the root and from every app. Two different folders that hold a part of the same name now give a `duplicate-part` finding.
