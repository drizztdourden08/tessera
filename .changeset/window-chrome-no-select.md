---
"@drizztdourden08/tessera": patch
---

Window chrome can no longer be selected by accident: WindowTitleBar with its title, status items, buttons and drag area, every WindowHeader (so the DialogShell, Drawer and ScreenWindow headers), the Widget title strip and DropdownMenu panels share one rule, `user-select: none`, from `theme/window-chrome.css`. A text input, a text area or editable text inside them can still be selected and typed in.
