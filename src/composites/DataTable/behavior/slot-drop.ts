/* @layer renderer-components @kind logic */
import { itemGroups } from './item-groups';
import type { FlatItem } from './flatten-rows.type';
import type { SlotDrop } from './slot-drop.type';

const slotDrop = <T>(items: readonly FlatItem<T>[], slot: number): SlotDrop => ({
  before: items.slice(0, slot).filter((item) => item.kind === 'row').length,
  groupKey: itemGroups(items)[Math.max(0, slot - 1)],
});

export { slotDrop };
