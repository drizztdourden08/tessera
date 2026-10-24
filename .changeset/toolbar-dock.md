---
"@drizztdourden08/tessera": minor
---

Add ToolbarDock, a frame that holds toolbars on the four edges of a work area, up to two lanes on each side. It draws the layout from the toolbar model and hands each toolbar its orientation and a handle for its grip. Dragging the grip moves the toolbar to another lane or side with a drop preview, refuses a full side, and hides it when dropped on the basket. Escape puts it back. The keyboard does every move too: Enter or Space on the grip picks the toolbar up and opens the move guide, arrow keys choose a side and then the outer or inner lane, Delete hides, Enter drops and Escape cancels, with each step announced. Dropping a toolbar where it already is does not change the layout.
