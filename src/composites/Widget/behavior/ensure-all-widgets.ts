/* @layer renderer-components @kind logic */
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { createDefaultWidgetState } from './create-default-widget-state';
import { getWidgetDefinition } from './get-widget-definition';

const ensureAllWidgets = (layout: WidgetLayout, definitions: readonly WidgetDefinition[]): WidgetLayout => {
  const existing = new Set(layout.widgets.map((w) => w.id));
  const missing = definitions.filter((d) => !existing.has(d.id));
  return {
    widgets: [
      ...layout.widgets.map((w) => {
        const def = getWidgetDefinition(definitions, w.id);
        return def ? { ...w, visibility: def.defaultVisibility } : w;
      }),
      ...missing.map((def, i) => createDefaultWidgetState(def, layout.widgets.length + i)),
    ],
  };
};

export { ensureAllWidgets };
