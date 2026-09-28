/* @layer renderer-components @kind logic */
import type { WidgetLayout, WidgetState } from '../Widget.type';

const getWidgetState = (layout: WidgetLayout, id: string): WidgetState | undefined =>
  layout.widgets.find((w) => w.id === id);

export { getWidgetState };
