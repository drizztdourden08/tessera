---
'@drizztdourden08/tessera': minor
---

Screens, SideNavLayout and Hero fit small windows and phones. The screen card fills the layer under 840 px wide or 560 px high (was 480 and 440) and its padding shrinks to lg under 960 by 600 and md once it fills the layer. SideNavLayout folds under 640 px wide into a bar with a menu button and the search, and the nav opens as a drawer over the page. Hero gives its art a column of its own, so the aside never covers it and it is never cut off, keeps the aside at least 320 px wide, shrinks from 408 px to 288 px when the room is short, and stacks under 720 px wide. --hero-art-left is removed; --hero-h-min and --hero-aside-min are new.
