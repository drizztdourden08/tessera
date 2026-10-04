---
"@drizztdourden08/tessera": patch
---

The Widget title bar buttons (pin, pop out or pop in, options, close and the menu buttons) take the hit-area class, so each takes clicks on 24 by 24 px around its 20 px box; a FactsPanel value cut short with a tooltip is focusable, so the keyboard reaches its full text. See MIGRATION.md under "Widget title bar buttons take clicks on 24 by 24 px, and a cut FactsPanel value takes focus".
