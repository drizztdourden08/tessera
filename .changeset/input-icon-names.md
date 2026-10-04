---
'@drizztdourden08/tessera': minor
---

InputIcon exports `INPUT_ICON_FAMILIES`, `INPUT_ICON_NAMES`, the accepted names of each family as a readonly list, and `isInputIconName(family, name)`. `InputIconFamily` and `InputIconName` come from those lists, and a test keeps them equal to the glyph data. A name the family does not have draws a question mark key and warns in development. See MIGRATION.md.
