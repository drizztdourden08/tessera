---
"@drizztdourden08/tessera": patch
---

A chip row in a page header never wraps and never squeezes the title. HeaderAnchorNav, the chip row of SettingsPage and of any ContentHeader or ScreenPage strip, now scrolls sideways on the same strip as Tabs: the mouse wheel scrolls it without Shift, and an arrow and a fade show at each edge only while chips are hidden there. Beside the title the row takes the room that is left; ScreenPage moves it under the title only when that room is less than two of its widest chips, and it scrolls there too.
