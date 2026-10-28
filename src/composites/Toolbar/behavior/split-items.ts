/* @layer renderer-components @kind util */
import type { ToolbarItem, ToolbarSplit } from '../Toolbar.type';
import { itemPriorities } from './item-priorities';
import { tidySeparators } from './tidy-separators';

const keptIndices = (items: readonly ToolbarItem[], count: number): ReadonlySet<number> => {
  const priorities = itemPriorities(items);
  const order = items.map((_item, index) => index).sort((left, right) => (priorities[right] ?? 0) - (priorities[left] ?? 0) || left - right);
  return new Set(order.slice(0, count));
};

const splitItems = (items: readonly ToolbarItem[], fit: number): ToolbarSplit => {
  const count = Math.max(0, Math.min(items.length, fit));
  if (count >= items.length) return { shown: items, folded: [] };
  const kept = keptIndices(items, count);
  return {
    shown: tidySeparators(items.filter((_item, index) => kept.has(index))),
    folded: tidySeparators(items.filter((_item, index) => !kept.has(index))),
  };
};

export { splitItems };
