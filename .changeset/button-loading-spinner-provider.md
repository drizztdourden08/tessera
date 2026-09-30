---
'@drizztdourden08/tessera': minor
---

`Button` and `IconButton` take `loading`, which shows the Spinner in place of the icon, disables the button, sets `aria-busy` and keeps its width; a disabled button no longer spins its icon. `Spinner` takes `label`, renders a `span` and fades in place of turning with reduced motion. The new `TesseraProvider` lets an app swap the spinner for its own, once at the root, for every Tessera part that draws one. `AboutPanel`, `CreateRecordDialog` and the `RecordEditor` save button show the spinner while they work in place of their Collecting..., Creating... and Saving... labels; see MIGRATION.md.
