/* @layer renderer-components @kind logic */
import { paneOf } from '../../DockLayout';
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout, WidgetPlacement } from '../Widget.type';

const placementOf = (layout: WidgetLayout, id: WidgetId): WidgetPlacement | null => {
  if (paneOf(layout.dock, id)) return 'docked';
  if (layout.floating.some((f) => f.id === id)) return 'floating';
  if (layout.popped.some((p) => p.id === id)) return 'popped';
  return null;
};

export { placementOf };
