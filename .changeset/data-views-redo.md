---
'@drizztdourden08/tessera': minor
---

`FilterBar` drops facets: every filter is added with a + menu and shows as a chip of joined segments, field, operator, value and remove, each one editable. `LogPanel` is redone as one framed box with a `FilterBar` toolbar and filters its lines itself. `ListItemRow` takes any number of two-line `columns`, and the new `ListItemList` lines them up across rows. `GroupTree` is rebuilt as a real tree with guides, icons, counts, selection and keyboard support. `DataTable` draws a full border and scrolls sideways inside itself. See MIGRATION.md.
