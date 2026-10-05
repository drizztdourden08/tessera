/* @layer renderer-components @kind logic */
import { MAIN_NODE, removeWidget, widgetsIn } from '../../DockLayout';
import type { WidgetId } from '../../DockLayout';
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { frameOf } from './frame-of';
import { getWidgetDefinition } from './get-widget-definition';
import type { WidgetGates } from './widget-layout.type';

const contextOn = <D extends WidgetDefinition>(gates: WidgetGates<D>, definition: D): boolean =>
  (typeof gates.contextActive === 'function' ? gates.contextActive(definition) : gates.contextActive);

const isHidden = <D extends WidgetDefinition>(layout: WidgetLayout, id: WidgetId, gates: WidgetGates<D>): boolean => {
  const def = getWidgetDefinition(gates.definitions, id);
  if (!def || !gates.contentIds.includes(id)) return true;
  const forced = gates.forcedIds.includes(id);
  const contextOnly = frameOf(layout, id, def).show === 'context-only';
  if (contextOnly && gates.pageOpen) return true;
  if (contextOnly && !forced && !contextOn(gates, def)) return true;
  return def.devOnly === true && !gates.developerToolsEnabled && !forced;
};

const visibleLayoutOf = <D extends WidgetDefinition>(layout: WidgetLayout, gates: WidgetGates<D>): WidgetLayout => {
  const present = [...widgetsIn(layout.dock), ...layout.floating.map((f) => f.id), ...layout.popped.map((p) => p.id)];
  const hidden = present.filter((id) => isHidden(layout, id, gates));
  if (hidden.length === 0) return layout;
  return {
    ...layout,
    dock: hidden.reduce((tree, id) => removeWidget(tree, id) ?? MAIN_NODE, layout.dock),
    floating: layout.floating.filter((f) => !hidden.includes(f.id)),
    popped: layout.popped.filter((p) => !hidden.includes(p.id)),
  };
};

export { visibleLayoutOf };
