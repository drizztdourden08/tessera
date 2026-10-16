/* @layer renderer-components @kind logic */
import type { MenuNode } from '../../DropdownMenu';
import type { WindowTitleBarViewPosition } from '../WindowTitleBar.type';
import type { PlacedNode } from './placed-node.type';

const indexOf = (length: number, position: WindowTitleBarViewPosition = 'start'): number => {
  if (position === 'start') return 0;
  if (position === 'end') return length;
  return Math.min(Math.max(0, Math.trunc(position)), length);
};

const insertNodes = (nodes: readonly MenuNode[], placed: readonly PlacedNode[]): MenuNode[] => {
  const at = placed.map(({ place }) => indexOf(nodes.length, place.position));
  const before = (index: number): MenuNode[] => placed.filter((_, entry) => at[entry] === index).map(({ node }) => node);
  return [...nodes.flatMap((node, index) => [...before(index), node]), ...before(nodes.length)];
};

export { insertNodes };
