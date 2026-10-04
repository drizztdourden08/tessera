---
"@drizztdourden08/tessera": minor
---

`ItemCard` is new: one item of a catalogue as a card, with `media` on top or on the left (`layout`) over a gradient in `mediaTone`, an `eyebrow` and a `status` on one line, the title as a heading (`level`, 3 by default), `tags`, `details` joined with dots and stopped at three lines, and `actions` through an `ActionBar` with one action in view. `onOpen` or `href` makes the title a button or a link whose hit area covers the card, with the focus ring around the card; `selected` draws the primary border and marks the title with `aria-current`.
