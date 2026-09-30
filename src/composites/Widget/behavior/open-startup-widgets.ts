/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { dockOnEdge } from './dock-on-edge';
import { getWidgetDefinition } from './get-widget-definition';

const openStartupWidgets = (layout: WidgetLayout, ids: readonly string[], definitions: readonly WidgetDefinition[]): WidgetLayout =>
  ids.reduce((acc, id) => {
    const def = getWidgetDefinition(definitions, id);
    return def ? dockOnEdge(acc, id, def.defaultSide, true) : acc;
  }, layout);

export { openStartupWidgets };
