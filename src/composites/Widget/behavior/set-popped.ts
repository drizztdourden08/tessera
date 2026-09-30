/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import type { PoppedWidget, WidgetLayout } from '../Widget.type';

const setPopped = (layout: WidgetLayout, id: WidgetId, patch: Partial<PoppedWidget>): WidgetLayout => ({
  ...layout,
  popped: layout.popped.map((p) => (p.id === id ? { ...p, ...patch, id } : p)),
});

export { setPopped };
