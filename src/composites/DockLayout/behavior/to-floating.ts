/* @layer renderer-components @kind logic */
import type { FloatingWidget, Rect, WidgetId } from '../DockLayout.type';

const toFloating = (id: WidgetId, rect: Rect, main: Rect): FloatingWidget => ({
  id,
  x: main.width > 0 ? (rect.x - main.x) / main.width : 0,
  y: main.height > 0 ? (rect.y - main.y) / main.height : 0,
  width: rect.width,
  height: rect.height,
});

export { toFloating };
