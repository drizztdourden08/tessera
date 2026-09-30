/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../DockLayout.type';
import { mapSplit } from './map-split';

const evenSplit = (tree: LayoutNode, target: SplitNode, index: number): LayoutNode =>
  mapSplit(tree, target, (split) => {
    const sizes = [...split.sizes];
    const half = ((sizes[index] ?? 0) + (sizes[index + 1] ?? 0)) / 2;
    sizes[index] = half;
    sizes[index + 1] = half;
    return { ...split, sizes };
  });

export { evenSplit };
