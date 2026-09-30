/* @layer renderer-components @kind logic */
import { paneOf, patchPane } from '../../DockLayout';
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';

const setMakeRoom = (layout: WidgetLayout, id: WidgetId, makeRoom: boolean): WidgetLayout => {
  const pane = paneOf(layout.dock, id);
  return pane ? { ...layout, dock: patchPane(layout.dock, pane.key, { makeRoom }) } : layout;
};

export { setMakeRoom };
