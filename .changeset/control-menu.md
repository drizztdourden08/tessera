---
"@drizztdourden08/tessera": minor
---

`ControlMenu` is new: a dropdown of settings behind one button, each row a label with one compact control (SegmentedControl, Toggle, Slider, Select, NumberStepper), joined to its trigger like a DropdownMenu, with sub-panels joined at their row, a filter that narrows rows by label, and the shared popup stack. WidgetOptions keeps its 0.15.0 rows and opens in a ControlMenu from the widget gear (`Widget` takes `options`), `OptionRow` becomes `ControlMenuRow`, the shared listbox drop can line up with the end of its trigger, and the DropdownMenu-based widget menu from the previous change is withdrawn. A widget opened on an edge takes its `defaultDockedSize` as its share of the window, and joins a pane already on that edge as a split instead of stacking another 22 percent pane further out.
