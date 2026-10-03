---
'@drizztdourden08/tessera': minor
---

`PasswordInput` is a new primitive built on `TextInput`: an eye button with `aria-pressed` that keeps the focus and the caret, controlled or not, with `hideOnBlur`; any mask character drawn over the real password input in the mono font, so autofill and password managers keep working; a `monospace` option; a Caps Lock warning; and an optional rule checklist and strength meter, from the rules or from a host score, announced once typing pauses. `mode="new"` asks for a new password. `InputAdornmentAction` takes `pressed`, the string table gains a `password` group, and the icon set gains `arrow-big-up-dash` and `circle`. See MIGRATION.md.
