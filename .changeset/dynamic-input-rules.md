---
'@drizztdourden08/tessera': minor
---

DynamicInput takes a `chars` option per text slot, a string or a set of the allowed characters, that replaces the slot kind and follows its case.
It takes an `aliases` map per slot or per pattern that maps typed characters before the check, on typing and on paste.
It takes a `validate` function per slot and per pattern that makes the control invalid and shows the message under it, and the `invalid` prop still wins.
