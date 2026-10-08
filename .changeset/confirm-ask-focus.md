---
'@drizztdourden08/tessera': patch
---

A confirm question that closes without the check gives focus back to the button that opened it when focus was inside the question, in ConfirmIconButton, ActionBar and the SettingsRow action, so CommandPalette keeps its keys; CommandPalette takes the arrow keys and typing from a row's button, and `onCancel` runs when a question goes away because its part unmounts.
