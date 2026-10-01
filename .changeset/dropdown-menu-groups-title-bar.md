---
'@drizztdourden08/tessera': minor
---

`DropdownMenu` builds from data: `groups` of items with an icon name, a description, a shortcut drawn with `Shortcut`, checked and disabled states, submenus and separators at any depth, with full keyboard support and menu roles. `trigger="hamburger"` draws an animated hamburger in a gold edge with the menu hanging from it as the `Select` list does. `WindowTitleBar` builds its menu from `menu` groups, and its pin, full screen, minimize, maximize and close buttons are built in, report to `onControl` and can be turned off through `controls` (all but close). `MenuEntry`, `items`, `key`, `onClick` and the title bar callbacks are replaced; see MIGRATION.md.
