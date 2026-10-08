/* @layer renderer-components @kind logic */
import { MIN_SIZE } from '../DockLayout.constants';
import type { DividerRect } from './layout-tree.type';

const dividerRange = ({ node, index, along }: DividerRect) => {
  const before = node.sizes[index] ?? 0;
  const pair = before + (node.sizes[index + 1] ?? 0);
  return { value: before * along, min: MIN_SIZE * along, max: (pair - MIN_SIZE) * along };
};

export { dividerRange };
