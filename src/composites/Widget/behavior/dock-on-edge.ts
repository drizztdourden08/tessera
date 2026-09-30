/* @layer renderer-components @kind logic */
import type { DockEdge, WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { dockWidget } from './dock-widget';

const dockOnEdge = (layout: WidgetLayout, id: WidgetId, edge: DockEdge, makeRoom = true): WidgetLayout =>
  dockWidget(layout, id, { at: 'outer', edge }, makeRoom);

export { dockOnEdge };
