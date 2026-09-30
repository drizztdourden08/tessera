/* @layer renderer-components @kind logic */
import { MIN_SIZE } from '../DockLayout.constants';
import type { LayoutNode, SplitNode } from '../DockLayout.type';
import { mapSplit } from './map-split';

const resizeSplit = (tree: LayoutNode, target: SplitNode, index: number, delta: number): LayoutNode =>
  mapSplit(tree, target, (split) => {
    const a = (split.sizes[index] ?? 0) + delta;
    const b = (split.sizes[index + 1] ?? 0) - delta;
    if (a < MIN_SIZE || b < MIN_SIZE) return split;
    const sizes = [...split.sizes];
    sizes[index] = a;
    sizes[index + 1] = b;
    return { ...split, sizes };
  });

export { resizeSplit };
