---
'@drizztdourden08/tessera': patch
---

`useDockKeys` no longer reads `window` while rendering, so pages that render on the server, like the gallery build, work again.
