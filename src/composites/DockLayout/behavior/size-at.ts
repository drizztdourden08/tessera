/* @layer renderer-components @kind logic */
import type { SplitNode } from '../DockLayout.type';

const sizeAt = (node: SplitNode, index: number) => node.sizes[index] ?? 0;

export { sizeAt };
