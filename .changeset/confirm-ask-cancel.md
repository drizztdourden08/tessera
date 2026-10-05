---
"@drizztdourden08/tessera": minor
---

ConfirmIconButton takes `onCancel`, which runs when its question closes without the check, and `onAsk`, which runs when a press opens it. The same `onCancel` is on an ActionBar action, a SettingsRow action and a DropdownMenu confirm item, and runs from the cross, Escape, focus or the pointer leaving, the timeout, disabling, or a second ActionBar question taking the place of the first.
