---
'@drizztdourden08/tessera': minor
---

DataTable group rows span the whole scrolled width, with the group label pinned to the start edge and the field name and count pinned to the end edge, in both directions. The sort toggle, the column menu trigger and the table options gear are IconButtons. Reference cells are a Link with the new `variant="subtle"` when the table gets `resolveIdRefHref`, and plain text otherwise. `FieldPicker` is removed. FilterBar's add menu shows each field's type with an icon, a label and a colour, and each chip shows the same icon in place of its dot. IconButton takes a `ref`.
