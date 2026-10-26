---
'@drizztdourden08/tessera': minor
---

Dialog and DialogShell take `size` (sm, md or lg): the width follows the content between a min and a max from tokens, never passes the window minus a margin, and the height grows to the window with only the body scrolling. `steady` pins the width to the max of the size, which JobDialog, CreateRecordDialog and DeleteGuardDialog use to keep today's width.
