/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../DockLayout.type';
import { mapSplit } from './map-split';
import { pushSizes } from './push-sizes';
import type { ResizeStep } from './resize-origin.type';

const resizeSplit = (tree: LayoutNode, target: SplitNode, index: number, step: ResizeStep): LayoutNode =>
  mapSplit(tree, target, (split) => {
    if (index < 0 || index + 1 >= split.sizes.length) return split;
    const { delta, origin } = step;
    const sizes = origin?.sizes.length === split.sizes.length
      ? pushSizes(origin.sizes, index, origin.delta)
      : pushSizes(split.sizes, index, delta);
    return { ...split, sizes };
  });

export { resizeSplit };
