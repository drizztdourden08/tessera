/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './createDefaultLayout';
import { ensureAllWidgets } from './ensureAllWidgets';

const startingLayout = (definitions: readonly WidgetDefinition[], preset?: WidgetLayout): WidgetLayout =>
  preset ? ensureAllWidgets(preset, definitions) : createDefaultLayout(definitions);

export { startingLayout };
