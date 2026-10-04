---
"@drizztdourden08/tessera": patch
---

DialogShell, and every dialog built on it, moves focus in on open, keeps Tab and Shift+Tab inside, brings focus back from the page behind and returns it to the opener on close; only the top dialog closes on Escape. A danger Dialog and DeleteGuardDialog start on Cancel, CreateRecordDialog starts in its first field, and the new `initialFocus="dialog"` starts on the panel.
