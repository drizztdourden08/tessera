---
'@drizztdourden08/tessera': minor
---

`SplitButton` takes `panel`, a render function that opens control rows behind the chevron in place of the `items` menu. Fill it with `ControlMenuRow` rows holding sliders, segmented choices and toggles, such as an onion skin toggle with opacity, frame range and tint. The panel sits under the chevron like the menu, takes focus on its first control, stays open while the controls change, and closes on a click outside or Escape, which returns focus to the chevron. The render function receives `close` for a control that should end the visit. The chevron then reports `aria-haspopup="dialog"`. `items` is now optional, and a `SplitButton` with `items` behaves as before.
