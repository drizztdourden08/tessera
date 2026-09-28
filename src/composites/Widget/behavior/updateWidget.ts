/* @layer renderer-components @kind logic */
import type { WidgetLayout, WidgetState } from '../Widget.type';

const updateWidget = (layout: WidgetLayout, id: string, patch: Partial<WidgetState>): WidgetLayout => ({
  widgets: layout.widgets.map((w) => (w.id === id ? { ...w, ...patch } : w)),
});

export { updateWidget };
