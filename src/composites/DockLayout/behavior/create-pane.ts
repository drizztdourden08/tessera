/* @layer renderer-components @kind logic */
import type { PaneNode, WidgetId } from '../DockLayout.type';

let keySeq = 0;

const nextPaneKey = (): string => {
  const key = `p${Date.now().toString(36)}${keySeq.toString(36)}`;
  keySeq += 1;
  return key;
};

const createPane = (widgets: WidgetId[], makeRoom = true): PaneNode =>
  ({ kind: 'pane', key: nextPaneKey(), widgets: [...widgets], active: widgets[0] ?? '', makeRoom });

export { createPane };
