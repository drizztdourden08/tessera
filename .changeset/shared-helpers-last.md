---
"@drizztdourden08/tessera": minor
---

The last five cases of TX-38 share one helper each. ItemList's rename, the DataTable column rename and InlineCreateForm's name edit a name in place the same way: Enter keeps, Escape undoes and stops there, and InlineCreateForm's Escape now runs `onCancel`. Wizard's exit guard and ListDetail's guard decide when to ask and run stay, discard and save through one hook, each in its own look. CommandPalette scrolls its active row through the listbox's scroll, which follows the CSS zoom. Slider, Splash and KeyValueEditor clamp through `clampNumber`, and CommandInput keeps its history through the shared storage read and write. Strings that said the same thing are one, such as `common.discard`, `common.unsavedTitle`, `common.keepEditing`, `common.renameNamed` and `common.resetNamed`, with every move in RENAMES.json, so the Wizard's question is titled Unsaved changes and ListDetail's stay button reads Keep editing.
