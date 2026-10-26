---
'@drizztdourden08/tessera': minor
---

Hero takes `size="full"` to span the window edge to edge at least one viewport tall minus `--hero-full-offset`, and image art takes `motion: 'pan'` for a slow drift that stops under reduced motion. The new `PageRoot` primitive sets `data-scroll="document"` on the html element so a website page scrolls with the document, and the new `PageFrame` primitive is a padded full-height frame that scrolls on its own for apps that keep the root locked.
