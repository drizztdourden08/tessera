---
'@drizztdourden08/tessera': minor
---

`PatternInput` replaces `PositionInput`, with no alias. The field is written as a pattern of muted text, typed slots such as `{hh:hour 12h}`, `{amount:decimal 2 group}` or `{country:choice @countries flag}`, echoes, icons and action buttons. Each slot is its own segment: typing fills it, a full slot moves on, Tab and Backspace move between slots, and the slot in focus opens a popover with a Stepper, a Slider, a NumberInput, an option list or a ColorPicker. The value is one object keyed by slot name. `parsePattern` and `escapePatternText` are exported, and a bad pattern warns in development without throwing. `clampAxis`, `clampPosition`, `isValidForAxis`, `isWithinAxis`, `PositionAxis` and `PositionValue` are removed. RecordEditor draws its x and y pairs with PatternInput. See MIGRATION.md.
