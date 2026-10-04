---
'@drizztdourden08/tessera': minor
---

InputIcon: the SNES glyphs are vector paths only, with no blur filter or bitmap, and their pressed d-pad arrow is red. The generic family adds `dpad` and the four d-pad directions, and `gamepadInputIcon('generic', 'dpup')` maps to them. `tone="theme"` paints highlights in `--c-primary` with a thin gap around them. See MIGRATION.md.
