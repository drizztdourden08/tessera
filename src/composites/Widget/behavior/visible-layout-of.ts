/* @layer renderer-components @kind logic */
import { MAIN_NODE, removeWidget, widgetsIn } from '../../DockLayout';
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { frameOf } from './frame-of';
import { getWidgetDefinition } from './get-widget-definition';
import type { WidgetGates } from './widget-layout.type';

const isHidden = (layout: WidgetLayout, id: WidgetId, gates: WidgetGates): boolean => {
  const def = getWidgetDefinition(gates.definitions, id);
  if (!def || !gates.contentIds.includes(id)) return true;
  const forced = gates.forcedIds.includes(id);
  const contextOnly = frameOf(layout, id, def).show === 'context-only';
  if (contextOnly && gates.pageOpen) return true;
  if (contextOnly && !gates.contextActive && !forced) return true;
  return def.devOnly === true && !gates.developerToolsEnabled && !forced;
};

const visibleLayoutOf = (layout: WidgetLayout, gates: WidgetGates): WidgetLayout => {
  const present = [...widgetsIn(layout.dock), ...layout.floating.map((f) => f.id)];
  const hidden = present.filter((id) => isHidden(layout, id, gates));
  if (hidden.length === 0) return layout;
  return {
    ...layout,
    dock: hidden.reduce((tree, id) => removeWidget(tree, id) ?? MAIN_NODE, layout.dock),
    floating: layout.floating.filter((f) => !hidden.includes(f.id)),
  };
};

export { visibleLayoutOf };
