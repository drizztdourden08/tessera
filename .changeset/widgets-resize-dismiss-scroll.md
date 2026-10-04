---
"@drizztdourden08/tessera": minor
---

Widgets from hands-on testing in Brock: a floating widget resizes from every edge and corner, between `floatingMin` (160 by 96 pixels by default) and the main view it floats over; the WidgetOptions panel closes on a press anywhere outside it, on Escape (innermost first), when focus leaves it and when the window loses focus; every widget body scrolls with the slim ScrollArea and keeps a gutter for the thumb, so it never covers text; the drag hint is a compact one line card at full opacity beside the pointer, kept on screen, and WindowGuideOverlay takes `pointer` to sit beside the pointer too. Window groups are removed: the Window group row of WidgetOptions, the Window group sub-menu of the WindowTitleBar View menu, their props, the `WindowGroup` and `WindowTitleBarGroup` types and their strings.
