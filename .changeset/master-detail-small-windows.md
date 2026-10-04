---
"@drizztdourden08/tessera": minor
---

MasterDetailLayout stacks its list and detail under 768 px, showing the detail with a Back button that calls `onBack` and the list once the detail is empty, and on a wide window its list column drags from 240 to 480 px through the SplitPane divider, with the arrow keys, Home, End and Enter, remembered under `storageKey`; new props `onBack`, `backLabel`, `resizable`, `listWidth`, `minListWidth`, `maxListWidth`, `storageKey`, `listLabel` and `detailLabel`. See MIGRATION.md under "MasterDetailLayout stacks on small windows and its list column drags".
