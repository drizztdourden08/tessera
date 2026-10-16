---
"@drizztdourden08/tessera": minor
---

Box takes `surface`, `sunken` or `raised`, for a well set into the page or a panel lifted off it: the fill, a thin border and the corner from the tokens, and for `raised` the first shadow, all at zero specificity so a part's own rules win. The `BoxSurface` type is exported. CodeView, the CodeBlock editor, ColorPicker's hex box and quick assign list, PressedGrid cells, RecordEditor array items and fallback, the ListDetailLayout list pane and ShortcutTour now draw on it and drop their own copies, with the same look. Box has a usage file, so the guide answers a plain block with it.
