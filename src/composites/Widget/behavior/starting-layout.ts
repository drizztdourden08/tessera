/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './create-default-layout';
import { ensureAllWidgets } from './ensure-all-widgets';

const startingLayout = (definitions: readonly WidgetDefinition[], preset?: WidgetLayout): WidgetLayout =>
  preset ? ensureAllWidgets(preset, definitions) : createDefaultLayout(definitions);

export { startingLayout };
