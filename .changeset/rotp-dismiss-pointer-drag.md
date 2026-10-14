---
'@drizztdourden08/tessera': minor
---

Four parts an app no longer keeps a copy of. Anchored takes `onDismiss` and closes on Escape, through the shared Escape stack at the popover level, or on a press outside; `dismissOnEscape` and `dismissOnOutsidePress` turn either off. `useDismissListeners` and its `UseDismissListenersParams` type are exported, with a new `outsidePress` option. Tooltip takes `follow="pointer"` to sit beside the pointer and stay inside the window. A StackedBar segment takes a `description`, shown under its name, value and share in its tooltip. Shortcut draws `mouse="drag"`: the held left button with the move arrows.
