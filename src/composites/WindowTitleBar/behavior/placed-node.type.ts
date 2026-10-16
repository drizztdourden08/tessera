/* @layer renderer-components @kind types */
import type { MenuNode } from '../../DropdownMenu';
import type { WindowTitleBarViewPlace } from '../WindowTitleBar.type';

interface PlacedNode {
  node: MenuNode;
  place: WindowTitleBarViewPlace;
}

export type { PlacedNode };
