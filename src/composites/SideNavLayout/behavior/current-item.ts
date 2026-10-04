/* @layer renderer-components @kind logic */
import type { SideNavConfig, SideNavItem } from '../../SideNav';

const currentItem = (config: SideNavConfig, activeId: string): SideNavItem | undefined =>
  [config.home, ...config.groups.flatMap((group) => group.items)].find((item) => item?.id === activeId);

export { currentItem };
