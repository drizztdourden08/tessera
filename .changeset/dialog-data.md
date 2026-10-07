---
"@drizztdourden08/tessera": minor
---

DialogShell, Dialog, JobDialog, CreateRecordDialog, DeleteGuardDialog and WizardDialog take `id` and `data`, set on the element with `role="dialog"`; the title keeps its own id, so `aria-labelledby` still names the dialog.
