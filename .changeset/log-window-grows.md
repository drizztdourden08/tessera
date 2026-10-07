---
"@drizztdourden08/tessera": patch
---

LogPanel shows every new line of a log that starts empty or short: while it sits at the newest line, its window grows with the log up to 400 lines and then keeps the newest 400, with older lines behind Load older. Scrolled up, or after Load older, new lines add below the rows already shown, so the lines being read stay in place.
