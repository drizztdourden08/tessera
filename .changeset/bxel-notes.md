---
"@drizztdourden08/tessera": patch
---

ColorSwatch forwards its ref to its button, so an app can anchor a popover to it. Select draws `options` before `groups` when both are given, in place of dropping `options`. The ColorPicker usage says ColorPicker and ColorPickerPopover are imported from `/color-picker` and `/color-picker-popover`, which keep the colour library out of an app that never uses them.
