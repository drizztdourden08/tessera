---
'@drizztdourden08/tessera': minor
---

The `link` override leaves `TesseraProvider`. `Link` is now a styled link for a URL, with tones and an `external` variant, and the new `RouterLink` draws a route in the app: a real `href`, and a plain click calls `onNavigate(to)`. `Box` no longer takes `href`. The gallery puts its top groups under Core, and Core · Setup gains pages on the app setup, building compounds and views, and app primitives and composites, beside the TesseraProvider page. See MIGRATION.md.
