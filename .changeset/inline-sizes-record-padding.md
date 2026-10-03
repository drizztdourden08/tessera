---
'@drizztdourden08/tessera': minor
---

`InlineCreateForm` takes `size`, `md` or `sm`, and follows the size of the `Field` around it, else `md`; `compact` no longer forces `sm`, and the name field, the extra fields and the buttons all follow the size. `RecordEditor` takes `size` too, and each of its rows has the same padding on every side, so a marked row keeps its label and control clear of its edges. See MIGRATION.md section 55.
