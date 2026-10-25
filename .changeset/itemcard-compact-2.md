---
'@drizztdourden08/tessera': minor
---

ItemCard in compact density shows its tags on a line of their own, cut with a +N tag when they do not fit.
ItemCard details take text or nodes, such as a Tooltip around a status, and stay on one line in compact.
ActionItem takes loading, which shows a spinner and blocks the action, and nameSuffix, which makes the name and tooltip of each row unique.
ItemCard takes mediaLabel to name a media that means something, and mediaTone accepts tertiary.
ActionItem confirm takes false to skip the inline ask of a danger action, and true to make any action ask.
