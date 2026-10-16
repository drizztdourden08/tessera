---
"@drizztdourden08/tessera": patch
---

Menu, nav and palette items take `onHighlight`, called once each time the item is hovered, focused or reached with the arrow keys, and never while it is disabled. DropdownMenu items (so WindowTitleBar menus), submenu triggers, SideNav and SideNavLayout entries, FloatingSwitch items and CommandPalette rows take it on their item data, so an app can start loading a screen before it is picked. Nothing looks different.
