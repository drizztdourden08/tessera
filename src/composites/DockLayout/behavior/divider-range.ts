/* @layer renderer-components @kind logic */
import type { DividerRect } from './layout-tree.type';
import { slackOf } from './slack-of';

const sumOf = (sizes: readonly number[]) => sizes.reduce((sum, size) => sum + size, 0);

const dividerRange = ({ node, index, along }: DividerRect) => {
  const near = node.sizes.slice(0, index + 1);
  const far = node.sizes.slice(index + 1);
  const at = sumOf(near);
  return {
    value: at * along,
    min: (at - sumOf(near.map(slackOf))) * along,
    max: (at + sumOf(far.map(slackOf))) * along,
  };
};

export { dividerRange };
