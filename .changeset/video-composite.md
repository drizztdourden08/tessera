---
"@drizztdourden08/tessera": minor
---

`Video` moves from the primitives to the composites, since it is a whole player with its own bar, keys, full screen and idle timer. `@drizztdourden08/tessera/composites` now exports `Video` and `VideoProps` in place of `@drizztdourden08/tessera/primitives`; the root import, props, classes, keys and look are unchanged. Its gallery page moves to Composites · Content, and it gains a usage file. The volume icon comes from the `VolumeControl` rule; the volume, seek bar and speed menu stay the player's own, since `VolumeControl`, `Slider` and `DropdownMenu` lack the buffered band, the time preview and a menu drawn inside full screen.
