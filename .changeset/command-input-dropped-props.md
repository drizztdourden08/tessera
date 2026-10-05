---
"@drizztdourden08/tessera": patch
---

RENAMES.json lists the props CommandInput dropped in 0.23.0 when it stopped extending TextInputProps, such as `name` and `autoFocus`, each with what to do instead, so an upgrade finds them before the type check does.
