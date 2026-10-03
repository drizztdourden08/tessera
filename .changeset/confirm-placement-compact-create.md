---
'@drizztdourden08/tessera': minor
---

`ConfirmIconButton` takes `placement`, `start` (the default), `center` or `end`, so the icon keeps its edge when the question opens and the cancel button takes its place; `ProfilePicker` rows and the `SettingsGroupList` reset use `end`. `InlineCreateForm` takes `compact`, a one-line form at the `sm` size with icon buttons to create and cancel, and its error now describes the name field. `ErrorBoundary` moves to the primitives tier; the package root still exports it. See MIGRATION.md.
