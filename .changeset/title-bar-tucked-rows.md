---
"@drizztdourden08/tessera": patch
---

WindowTitleBar takes `tucked`, which renames, moves or hides the pin and full screen rows its main menu lists with `view={false}`: `label` and `activeLabel` name only that row, and `group` and `position` place it the way `view` places View. A hidden row leaves its button out of reach on a narrow window.
