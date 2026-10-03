---
'@drizztdourden08/tessera': minor
---

`SectionNav` is renamed `SideNav`, with its types, its `.section-nav*` classes and its `--section-nav-*` tokens following the new name, and the old grouped `SideNav` is removed. `SettingsShell` draws the new `SideNav` and takes `filterable`, `filterPlaceholder` and `header` itself. `HeaderTabs` is renamed `HeaderAnchorNav`, with `.header-tabs*` becoming `.header-anchor-nav*`; it now lists its buttons in a `ul` inside the `nav` and marks the current one with `aria-current="location"`. There are no aliases. See MIGRATION.md section 47.
