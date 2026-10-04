---
'@drizztdourden08/tessera': patch
---

Escape closes the innermost popup first. Popups that use useDismissListeners share one stack per document, so Escape in an open Select inside WidgetOptions closes only the Select and a second Escape closes the panel; a menu that handles Escape itself keeps the key, and a press inside a nested popup no longer closes the popups under it.
