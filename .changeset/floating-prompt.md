---
"@drizztdourden08/tessera": minor
---

New `FloatingPrompt` composite: a bar in the look of a Toast that floats at the foot of a region, asks a question with actions from data such as Apply and Cancel, and blocks that region until it is answered. It blocks its parent by default or the whole window with `scope="window"`, moves focus into the bar and back, and runs the action marked `cancel` on Escape.
