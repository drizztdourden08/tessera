---
'@drizztdourden08/tessera': minor
---

`WizardProgress` is now the `Stepper` primitive, with summaries and sub-steps in both orientations, an error state, lines that meet the circles exactly and one fill, line, border and glow sequence per step. The step definition drives the whole wizard: summary, sub-steps, hint, busy text, an extra control and the label or icon of each button. `WizardNav` is a `ButtonRow` with the new dark `bar` variant and generates Back and Next with arrows at the same size, the step content fades with the Stepper, and `WizardDialog` puts a wizard under the standard dialog header. See MIGRATION.md section 62.
