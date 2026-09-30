/* @layer renderer-components @kind logic */
import { createPane, findLeaf, insertAt } from '../../DockLayout';
import type { DockTarget, WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { removeEverywhere } from './remove-everywhere';

const dockWidget = (layout: WidgetLayout, id: WidgetId, target: DockTarget, makeRoom: boolean): WidgetLayout => {
  const cleared = removeEverywhere(layout, id);
  if (target.at !== 'outer' && findLeaf(cleared.dock, target.key) === null) return layout;
  return { ...cleared, dock: insertAt(cleared.dock, createPane([id], makeRoom), target) };
};

export { dockWidget };
