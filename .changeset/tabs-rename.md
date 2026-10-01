---
'@drizztdourden08/tessera': minor
---

`TabBar` is renamed `Tabs`, with its classes moving from `.tab-bar` to `.tabs`; there is no alias. When the tabs overflow, the scroll arrows no longer keep a blank space: the left arrow shows only once the strip has left the start and the right one only while more tabs wait to the right. The TesseraProvider gallery page now shows one override per section, each with a toggle, a demo and its own snippet. A `portalDocument` named in `TesseraProvider` now wins over the document a `Portal` is rendered in. See MIGRATION.md.
