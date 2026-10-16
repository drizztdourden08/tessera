/* @layer renderer-components @kind logic */
import type { MenuNode } from '../../DropdownMenu';
import type { WindowTitleBarViewPosition } from '../WindowTitleBar.type';

const indexOf = (length: number, position: WindowTitleBarViewPosition): number => {
  if (position === 'start') return 0;
  if (position === 'end') return length;
  return Math.min(Math.max(0, Math.trunc(position)), length);
};

const insertNode = (nodes: readonly MenuNode[], node: MenuNode, position: WindowTitleBarViewPosition): MenuNode[] => {
  const at = indexOf(nodes.length, position);
  return [...nodes.slice(0, at), node, ...nodes.slice(at)];
};

export { insertNode };
