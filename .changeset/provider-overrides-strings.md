---
'@drizztdourden08/tessera': minor
---

`TesseraProvider` takes every app part in one place: beside the spinner, a clipboard writer behind every copy button, a link component behind every `href`, the `Image` and `Thumbnail` placeholder, the `ErrorBoundary` crash screen, the `EmptyState` art, the portal document (`PortalDocumentContext` is removed) and an icon set behind `Icon` names. Every built-in string now comes from `TESSERA_STRINGS`, a typed table of English defaults an app overrides whole or key by key. `AboutPanel` loses `onCopy`, `OperatorSpec` loses `label`, and the new `Link` primitive renders every link; see MIGRATION.md.
