/* @layer renderer-components @kind logic */
import type { WidgetDefinition } from '../Widget.type';

const getWidgetDefinition = <D extends WidgetDefinition>(
  definitions: readonly D[],
  id: string,
): D | undefined => definitions.find((d) => d.id === id);

export { getWidgetDefinition };
