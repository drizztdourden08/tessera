/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';

const dropFrame = (layout: WidgetLayout, id: WidgetId): WidgetLayout => {
  const frame = { ...layout.frame };
  delete frame[id];
  return { ...layout, frame };
};

export { dropFrame };
