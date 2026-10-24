/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../../primitives/Icon';
import type { MenuGroup } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarItemBase } from '../Toolbar.type';

interface ToolbarToolProps {
  stopId: string;
  icon: IconName;
  label: string;
  tip: ReactNode;
  caption?: string;
  active?: boolean;
  disabled?: boolean;
  shortcut?: ToolbarItemBase['shortcut'];
  options?: readonly MenuGroup[];
  hoverOpen?: boolean;
  openOnPress?: boolean;
  onPress?: () => void;
}

export type { ToolbarToolProps };
