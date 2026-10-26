/* @layer renderer-components @kind logic */
import { createPane, wrapBeside } from '../../DockLayout';
import type { DockEdge, WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import type { DockPlace } from './widget-layout.type';
import { dockedShare } from './docked-share';
import { edgeStack } from './edge-stack';
import { joinEdge } from './join-edge';
import { removeEverywhere } from './remove-everywhere';
import { resizeEdge } from './resize-edge';

const dockOnEdge = (layout: WidgetLayout, id: WidgetId, edge: DockEdge, place: boolean | DockPlace = true): WidgetLayout => {
  const { makeRoom = true, size, weight, weightOf } = typeof place === 'boolean' ? { makeRoom: place } : place;
  const cleared = removeEverywhere(layout, id);
  const pane = createPane([id], makeRoom);
  const stack = edgeStack(cleared.dock, edge);
  const sized = stack && size !== undefined ? resizeEdge(cleared.dock, stack, dockedShare(edge, size)) : cleared.dock;
  const joined = stack ? joinEdge(sized, stack, pane, { edge, weight, weightOf }) : null;
  return { ...cleared, dock: joined ?? wrapBeside(cleared.dock, edge, pane, dockedShare(edge, size)) };
};

export { dockOnEdge };
