/* @layer renderer-components @kind logic */
import type { SplitNode } from '../DockLayout.type';
import { sizeAt } from './size-at';

const shareAt = (node: SplitNode, index: number) => sizeAt(node, index) / (node.sizes.reduce((total, size) => total + size, 0) || 1);

export { shareAt };
