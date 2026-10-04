---
"@drizztdourden08/tessera": minor
---

The widget gear opens the shared DropdownMenu in place of the WidgetOptions panel: `useWidgetOptionsMenu` turns placement, main view, show, opacity, pin, snap, sync, shortcuts, reset and a widget's own groups into menu groups that `Widget` takes as `options`, with radio sub-menus for choices, checks for toggles and plain items for actions, and `WidgetManager` takes `optionGroups` in place of `settingsContent`. The gear and pin menus sit in the top layer, stay inside the window, wrap long text, and open their sub-menus inline when there is no room beside the menu, so a narrow widget window shows every item with no sideways scroll.
