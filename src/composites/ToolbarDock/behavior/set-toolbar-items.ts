/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';

const sameIds = (left: readonly string[], right: readonly string[]): boolean => left.length === right.length && left.every((id, index) => id === right[index]);

const setToolbarItems = (layout: ToolbarLayout, id: string, hidden: readonly string[]): ToolbarLayout => {
  const ids = [...new Set(hidden)];
  if (sameIds(layout.items?.[id] ?? [], ids)) return layout;
  const items = Object.fromEntries(Object.entries(layout.items ?? {}).filter(([key]) => key !== id));
  if (ids.length > 0) items[id] = ids;
  const { items: _previous, ...others } = layout;
  return Object.keys(items).length > 0 ? { ...others, items } : others;
};

export { setToolbarItems };
