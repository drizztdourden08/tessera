---
'@drizztdourden08/tessera': minor
---

A standard wizard: `useWizard` holds the steps, the input, visited steps, errors, unsaved input and a finish that keeps every input when it fails; `WizardFrame` lays it out inside a screen by default, with the steps on top or in a column on the left, or in a dialog. `WizardProgress` is the step strip whose circles fill and connect as each step is done, with a compact form, summaries and sub-steps; `WizardStep`, `WizardNav`, `WizardReview` and `WizardExitGuard` are the other parts. `WizardDialogShell` is removed, `TermList` takes a node as a detail, and the string table gains a `wizard` group; see MIGRATION.md.
