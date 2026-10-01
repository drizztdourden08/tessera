---
'@drizztdourden08/tessera': minor
---

Controls publish hints: SegmentedControl and ToggleGroup options, Toggle, Slider and IconButton take a `hint` of a value label and a one-line description, report it through `onHint` and to the nearest `HintScope` while pointed at or keyboard focused, and `HintLine` shows it in a fixed line with an idle text. SegmentedControl, IconButton, Toggle, Slider and Shortcut gain an `xs` size, and SegmentedControl options can be icons alone. WidgetOptions is rebuilt from xs icon controls with a hint line at the bottom, and its shortcut list moves to a floating aside beside the panel; every function and prop is kept. Widget option strings and OptionRow's `hint` change; see MIGRATION.md.
