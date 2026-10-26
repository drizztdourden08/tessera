/* @layer renderer-components @kind logic */
import type { WidgetDefinition } from '../Widget.type';
import { getWidgetDefinition } from './get-widget-definition';

const weightLookup = (definitions: readonly WidgetDefinition[]) => (id: string): number | undefined =>
  getWidgetDefinition(definitions, id)?.dockWeight;

export { weightLookup };
