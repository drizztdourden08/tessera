/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { createDefaultWidgetState } from './createDefaultWidgetState';

const createDefaultLayout = (definitions: readonly WidgetDefinition[]): WidgetLayout => ({
  widgets: definitions.map((def, i) => createDefaultWidgetState(def, i)),
});

export { createDefaultLayout };
