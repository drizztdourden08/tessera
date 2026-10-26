/* @layer renderer-components @kind logic */
import type { FlatItem } from './flatten-rows.type';

const itemGroups = <T>(items: readonly FlatItem<T>[]): readonly (string | undefined)[] => {
  const stack: string[] = [];
  return items.map((item) => {
    if (item.kind === 'row') return stack[stack.length - 1];
    stack.length = item.node.level;
    stack.push(item.node.key);
    return item.node.key;
  });
};

export { itemGroups };
