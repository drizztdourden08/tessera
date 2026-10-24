/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { MenuGroup } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolMenu } from '../behavior/useToolMenu.type';

interface ToolbarToolMenuProps {
  groups: readonly MenuGroup[];
  anchorRef: RefObject<HTMLElement | null>;
  tool: ToolMenu;
  label: string;
  hoverOpen: boolean;
  popup: boolean;
}

export type { ToolbarToolMenuProps };
