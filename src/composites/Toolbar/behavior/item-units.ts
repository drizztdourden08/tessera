/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';
import { itemGroups } from './item-groups';

const itemUnits = (items: readonly ToolbarItem[]): number[][] => {
  const groups = itemGroups(items);
  const units: number[][] = [];
  items.forEach((item, index) => {
    const unit = item.kind !== 'separator' && groups[index] !== undefined ? units.at(-1) : undefined;
    if (unit) unit.push(index);
    else units.push([index]);
  });
  return units;
};

export { itemUnits };
