---
"@drizztdourden08/tessera": minor
---

Field, FormRow, Checkbox and Toggle take `help?: ReactNode`: a small circled question mark after the label that shows the note in a Tooltip on hover, keyboard focus or click, and keeps the note off the page. The mark is one Tab stop named Help, the note is its description while open, and it closes on pointer leave, blur, Escape or a click elsewhere. A click on the mark inside a Checkbox or Toggle does not change the value, and the control keeps its label text as its name.
