/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuGroup } from '../../DropdownMenu';

interface WidgetMenuProps {
  label: string;
  menuLabel: string;
  icon: ReactNode;
  groups: readonly MenuGroup[];
  lit?: boolean;
  className?: string;
}

export type { WidgetMenuProps };
