---
'@drizztdourden08/tessera': minor
---

`SearchResults` has a fixed head with the summary and "Open" chips for pages whose names match, and a body that scrolls on its own. Group headings are split into a glowing icon, a title, a count pill and an `openLabel` button, with `groupHeading="button"` for the old look. `idleIcon` shows a search spark above the idle message, and with no match the head stays and `emptyMessage` fills the body. `NavLayout` takes `paneScroll` and by default leaves the results to scroll themselves. The icon glow is one shared class, `.icon-glow`. See MIGRATION.md.
