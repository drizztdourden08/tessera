---
'@drizztdourden08/tessera': minor
---

FoldText is a public primitive. It clamps text to `lines` lines, and `overflow` picks what happens past them: `more` adds the More and Less control, `hint` keeps the height and shows the full text in a tip beside it (or the node passed as `hint`), and `clip` cuts the text with no control. The control and the tip only show when the text really runs past the lines. FormRow and SettingsRow draw their descriptions with it. The package exports `FoldText`, `FoldTextProps` and `FoldOverflow`.
