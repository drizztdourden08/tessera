---
"@drizztdourden08/tessera": minor
---

SettingsRow and SettingsItem take `changed` (a dot after the title), `onReset` (a reset button beside it on a changed row), `problem` (a line under the row in the danger tone), `badge` (after the title) and `descriptionLines` (folds a long description with More and Less); the row hint shows under the description at rest, and pointing changes that line instead of hiding the description; SettingsSection counts its changed rows when no `changedCount` is given. See MIGRATION.md under "Settings rows show changes, problems and badges".
