/* @layer renderer-components @kind logic */
import { createPane, wrapBeside } from '../../DockLayout';
import type { DockEdge, WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import type { DockPlace } from './widget-layout.type';
import { dockedShare } from './docked-share';
import { edgeStack } from './edge-stack';
import { joinEdge } from './join-edge';
import { removeEverywhere } from './remove-everywhere';

const dockOnEdge = (layout: WidgetLayout, id: WidgetId, edge: DockEdge, place: boolean | DockPlace = true): WidgetLayout => {
  const { makeRoom = true, size } = typeof place === 'boolean' ? { makeRoom: place } : place;
  const cleared = removeEverywhere(layout, id);
  const pane = createPane([id], makeRoom);
  const stack = edgeStack(cleared.dock, edge);
  const joined = stack ? joinEdge(cleared.dock, stack, pane, edge) : null;
  return { ...cleared, dock: joined ?? wrapBeside(cleared.dock, edge, pane, dockedShare(edge, size)) };
};

export { dockOnEdge };
