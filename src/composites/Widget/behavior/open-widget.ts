/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { dockOnEdge } from './dock-on-edge';
import { getWidgetDefinition } from './get-widget-definition';
import { isWidgetOpen } from './is-widget-open';

const openWidget = (layout: WidgetLayout, id: string, definitions: readonly WidgetDefinition[]): WidgetLayout => {
  const def = getWidgetDefinition(definitions, id);
  return def && !isWidgetOpen(layout, id) ? dockOnEdge(layout, id, def.defaultSide) : layout;
};

export { openWidget };
