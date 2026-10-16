/* @layer renderer-components @kind logic */
import type { DockDrop, WidgetId } from '../DockLayout.type';

const keepsGroups = (groupOf: (id: WidgetId) => string | undefined, id: WidgetId, drop: DockDrop): boolean => {
  if (drop.slot !== 'pane' || !drop.pane) return true;
  const group = groupOf(id);
  return drop.pane.widgets.every((other) => groupOf(other) === group);
};

export { keepsGroups };
