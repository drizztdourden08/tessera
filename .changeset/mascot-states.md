---
"@drizztdourden08/tessera": minor
---

`AnimatedMascot` is a state machine: change `animation` at any moment and the mascot blends from where it is, with the approved blend times, protected moments, upright symbols and face cross-fades; it takes `face`, and a clip that plays once goes back to idle and calls `onFinish`. `brand="auto"` picks the mascot of the nearest `data-palette`, and `ChosenMascot`, `MascotName`, `MascotChoice` and `mascotForBrand` are removed; `CommandPalette` takes a brand for `mascot`. `MascotStage`, the approved stage prototype, is in the package: several mascots on a stage of any width that walk, turn and act by command or on their own. `PixelWordmark`, `buildPixelWordmark` and `PIXEL_FONT` move to the brand tier. `InteractiveTessera` is no longer exported; it stays in the gallery.
