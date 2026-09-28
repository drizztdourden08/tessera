/* @layer renderer-components @kind types */
import type { SideNavGroup } from '../SideNav.type';

interface GroupTitleProps {
  group: SideNavGroup;
  activeId: string;
  onSelect: (id: string) => void;
}

export type { GroupTitleProps };
