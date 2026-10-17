---
"@drizztdourden08/tessera": minor
---

LogPanel kinds in any tone, and a count that hides at 0. A `LogKindDef` takes `tone?: LogKindTone`, a text tone, a tag tint such as `teal` or a hex colour from app data, `toneMessage?: boolean | LogKindTone` for a message tone of its own, and `uppercase?: boolean` for messages in capitals. A hex colour under 4.5:1 on the dark panel is lifted toward white until it reads, through the hex helpers Tag now shares from `src/primitives/hex-ink`. Badge takes `hideZero` on a count, and Tabs, Card, SectionHeader and HeaderAnchorNav take it and pass it to their counts, so a count of 0 draws nothing. A kind with a text tone or none, and a count without `hideZero`, keep their look.
