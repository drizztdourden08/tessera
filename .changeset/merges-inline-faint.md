---
"@drizztdourden08/tessera": minor
---

Six parts fold into the part they wrapped: `NumberStepper` is `NumberInput` with `buttons="sides"`, `Thumbnail` is `Image` with `frame`, `RouterLink` is `Link` with `navigate`, `Center` is `Flex` with `align` and `justify` at `center`, `TermList` is `FactsPanel` with `layout="terms"`, and `PathIcon` is `Icon` with `path`. NumberInput steps and clamps one way and labels its buttons Increase and Decrease, so `fields.increment` and `fields.decrement` are gone. `Inline` is a new row shortcut over `Flex`, the mirror of `Stack`. Text takes `tone="faint"` again, for decoration and secondary hints only, and the faint text rule lets that tone through.
