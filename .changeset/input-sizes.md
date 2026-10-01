---
'@drizztdourden08/tessera': minor
---

Every input takes `size`, `md` (the default) or `sm`, and the sizes line up: a row of `md` inputs and a `md` Button shares the new `--control-h-md` (39 px), and a row of `sm` ones shares `--control-h-sm` (28 px). `Field` passes its `size` to the control inside. The `xs` size of SegmentedControl, Toggle and Slider becomes `sm`, and `SegmentedSize`, `ToggleSize` and `SliderSize` give way to `ControlSize`. See MIGRATION.md.
