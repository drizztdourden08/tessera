---
"@drizztdourden08/tessera": minor
---

ListDetail asks before New opens the create form of its list while the editor holds unsaved edits, in the same bar or dialog. Discard opens the form, Save opens it once the save works, and Keep editing leaves it shut. An app that holds `createOpen` gets `onCreateOpenChange(true)` after the answer.
