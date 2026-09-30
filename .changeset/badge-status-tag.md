---
'@drizztdourden08/tessera': minor
---

One name per job: `Badge` is now a count or a dot (`inline`, `number` or `dot`, a circle for one character and a pill for more, `max` for 99+, anchored to the corner of an icon), the old coloured status word is `Status`, which absorbs `StatusBadge` as its `pill` look and drops the click to cycle mode, and the chip TagInput drew is the new `Tag` primitive, with `normal`, `urgency` and `category` variants whose colours the types check. TagInput, Combobox, the Select multi-select tags and TagPicker all draw `Tag` in one shared look, and the tab, table and search counts draw `Badge`; see MIGRATION.md.
