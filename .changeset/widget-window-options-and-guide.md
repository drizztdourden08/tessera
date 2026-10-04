---
'@drizztdourden08/tessera': minor
---

Widget windows get the pieces of a window system. WidgetOptions shows a Sync with main window switch and a Window group select for a widget in its own window, both controlled (`sync`, `onSyncChange`, `group`, `groups`, `onGroupChange`) and each with an info tooltip and a hint; WidgetManager passes them through `windowOptions`, `windowGroups` and `onWindowOptionsChange`. The new WindowGuideOverlay dims the window and shows a card with the keys while a window is moved or resized, including Snapping off while Ctrl is held. Widget takes `square` for a widget window shown fullscreen. OptionRow takes `about`.
