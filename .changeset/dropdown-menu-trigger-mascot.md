---
'@drizztdourden08/tessera': minor
---

`DropdownMenu` draws its own trigger from `trigger={{ label, icon, iconSide, iconOnly }}`, an `IconButton` or a `Button` in the menu `variant`, and joins the open menu to it at every size. `intensity` sets the edge: `strong`, `medium` or `subtle`. Menus close on an outside click, on Escape and when the trigger scrolls out of view. Items line up with or without icons, shortcuts share one column, `kind: 'radio'` adds radio items, `filter` searches every level, and sub-menus join the edge of their parent. `trigger="hamburger"` is now `trigger={{ label: 'Menu', iconOnly: true }}`. The new `ChosenMascot` picks a mascot by name or by brand and palette, and `CommandPalette` takes `mascot`. See MIGRATION.md section 63.
