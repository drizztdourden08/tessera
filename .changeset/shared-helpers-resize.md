---
"@drizztdourden08/tessera": minor
---

Every part that checks its layout again when an element changes size watches through one internal `observeResize`, which takes the observer of the element's own window and does nothing where there is none.
