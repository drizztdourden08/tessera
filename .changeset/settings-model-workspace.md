---
'@drizztdourden08/tessera': minor
---

Settings come from one model. `SettingsRow` is new: a title, a description, a live hint that says what the value or the pointed part does, and the input on the right, for every kind from a toggle to a keybind, with a compact and a read only look. `SettingsGroupList` is folded into `SettingsSection`, which now draws a whole section the way relic-of-the-past does, on the sunken fill. `WorkspaceScreen` builds its side nav, page header, sections and search from one `content` object, and searches every row of every page. `NavLayout` is renamed `SideNavLayout` and loses the menu filter. `SearchResultGroup` and `SearchResultHit` are new, and `SearchResults` draws with them. See MIGRATION.md section 61.
