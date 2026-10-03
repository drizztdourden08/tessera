---
'@drizztdourden08/tessera': minor
---

New `InputIcon` primitive: controller buttons, sticks, triggers, d-pads and keyboard keys for the xbox, playstation, switch, gamecube, snes, generic and keyboard families, with `gamepadInputIcon(family, id)` to match SDL button ids and `KeyboardEvent.code` values. `PressedGrid` takes `family` and an `icon` per item and draws its cells with `InputIcon`. Icon effects draw thinner, take a `size` of `sm`, `md` or `lg`, and gain a `comet` kind. The `DynamicInput` popover is as wide as the control it holds, with a 192 pixel floor for a slider. `Widget` shows a gear for its options. `DockLayout`, `WidgetManager` and the dock API pass `onPopOut(id, point?)` the screen point where a dragged widget left the window, and `visibleLayoutOf` drops popped widgets that fail the show rules. See MIGRATION.md.
