---
"@drizztdourden08/tessera": minor
---

New composite Toolbar. It is a row or a column of tools built from data: buttons, toggles, groups of choices, a number and separators, each with a hint that shows its name, description and shortcut. A tool with `options` opens a DropdownMenu on hover, below a row and beside a column, and items that do not fit fold into More. An optional `handle` draws a grip that a dock can wire through `handleProps`. Exports: `Toolbar` and its item types.

DropdownMenu can open to the `right` or `left` of its anchor and flips when there is no room. It also takes `openOnHover` on a trigger, and `hover` and `focusOnOpen` on an anchored menu. Tooltip takes `right` and `left` as placements.
