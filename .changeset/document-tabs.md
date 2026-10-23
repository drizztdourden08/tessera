---
"@drizztdourden08/tessera": minor
---

New composite DocumentTabs. It is the strip of open documents above an editor, such as the drawings of a pixel art editor. Each tab has a title cut with an ellipsis, an optional icon, a hover text, an unsaved dot that turns into the close button on hover or focus, and a close button named Close and the title. A middle click closes a tab. The user puts the tabs in order by dragging or with Alt and Left or Right, through the shared `src/composites/reorder` folder. The strip is a tablist: Left and Right move focus, Home and End go to the ends, Enter or Space activates, and Delete or Ctrl and W asks to close the focused tab. The app keeps `tabs` and `activeId` and can refuse a close in `onClose`. When the tabs do not fit, the strip scrolls with the active tab kept in view, and `overflowMenu` adds a DropdownMenu that lists every tab. Exports: `DocumentTabs`, `DocumentTab` and `DocumentTabsProps`.

ScrollStrip takes a new optional `trackProps`, the ARIA attributes of its track, so a strip can name its tablist.
