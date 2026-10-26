---
'@drizztdourden08/tessera': minor
---

TourStep takes `intro: true` with an `art` slot for a wide centred welcome panel beside a large mascot, and `reveal()` to bring a target in before the tour looks for it. The tour now scrolls a target to the centre at once, through every scrolling ancestor, and measures the lit part on the next frame, so the hole lands in the right place.
