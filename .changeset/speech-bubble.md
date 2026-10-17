---
"@drizztdourden08/tessera": minor
---

SpeechBubble, a box that speaks with a tail on any side, and `useReducedMotion` exported. It is an opaque `--c-surface` box with the border and tint of a Callout tone, `--radius-md` and `--shadow-overlay`; `pointer` puts the tail on `top`, `bottom`, `left` or `right` (default `none`), `pointerOffset` moves it along the edge, `maxWidth` limits the width, and the ref and other attributes go to the box. GuidedTour's bubble is now drawn by it and looks the same. `useReducedMotion(ref)` is exported from the package.
