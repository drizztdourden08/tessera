/* @layer renderer-components @kind logic */
import type { EmphasisAnchor } from '../Emphasis.type';

const rankFor = (index: number, count: number, anchor: EmphasisAnchor): number => {
  if (anchor === 'left') return index;
  if (anchor === 'right') return count - 1 - index;
  return Math.floor(Math.abs(2 * index - (count - 1)) / 2);
};

const anchorRanks = (count: number, anchor: EmphasisAnchor): number[] =>
  Array.from({ length: count }, (_unused, index) => rankFor(index, count, anchor));

export { anchorRanks };
