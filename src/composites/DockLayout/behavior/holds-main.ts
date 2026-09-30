/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';

const holdsMain = (node: LayoutNode): boolean =>
  node.kind === 'main' || (node.kind === 'split' && node.children.some(holdsMain));

export { holdsMain };
