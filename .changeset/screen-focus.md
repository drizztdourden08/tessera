---
"@drizztdourden08/tessera": patch
---

ScreenLayer is one modal dialog around the floating switcher and the card, moves focus to its title (or first control) on open, keeps Tab inside with the DialogShell focus code, makes its siblings inert while open, and returns focus to the opener when it closes or hides. A toast gives focus back to where it was before when its action or close button is chosen.
