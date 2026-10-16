---
"@drizztdourden08/tessera": patch
---

WindowTitleBar takes `view`, which places its View sub-menu in the main menu. `view={false}` leaves it out; `view={{ group, position }}` puts it into the `menu` group with that id, at an index or at `'start'` or `'end'`. Without `view` the menu is the same as before.
