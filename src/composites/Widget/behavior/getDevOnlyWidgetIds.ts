/* @layer renderer-components @kind logic */
import type { WidgetDefinition } from '../Widget.type';

const getDevOnlyWidgetIds = (definitions: readonly WidgetDefinition[]): string[] =>
  definitions.filter((d) => d.devOnly).map((d) => d.id);

export { getDevOnlyWidgetIds };
