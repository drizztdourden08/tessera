---
'@drizztdourden08/tessera': minor
---

`RENAMES.json` groups its maps by the release they ship in (`releases: [{ version, cssCustomProperties, components, ... }]`, oldest first), and every key maps straight to its final name, so an upgrade replays only the releases between two versions in one pass each. Unreleased entries sit under `next`, which the release step stamps with the new version.
