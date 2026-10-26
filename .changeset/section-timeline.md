---
'@drizztdourden08/tessera': minor
---

New SectionTimeline composite: a vertical, grouped list of section links with `aria-current="location"` on the active one, `onJump`, and a decorative progress line with an idle or hidden `state`. The line fills from a CSS scroll timeline (`timeline="scroll"` or a named view timeline) and jumps to `progress` or the active section without scroll-driven animation or with reduced motion.
