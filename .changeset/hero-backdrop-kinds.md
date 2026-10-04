---
"@drizztdourden08/tessera": minor
---

Hero's `backdrop` takes many kinds: a live scene node that fills the hero, an image by URL that covers, contains or tiles, a solid colour or token, or `null` for none; left out, it draws the brand gradient. `art` takes an image by URL or any node, and the new `shade` prop sets the fade that keeps text readable (`fade`, `scrim` or `none`). Both `backdrop` and `art` now name their kind: wrap a scene as `{ kind: 'node', node }` and art as `{ kind: 'image', src }`.
