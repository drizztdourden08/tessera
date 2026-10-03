/* @layer renderer-components @kind logic */
import type { SideNavGroup } from '../../SideNav';

const filterGroups = (groups: SideNavGroup[], query: string): SideNavGroup[] => {
  const q = query.trim().toLowerCase();
  if (!q) return groups;
  return groups
    .map((group) => ({ ...group, items: group.items.filter((item) => item.label.toLowerCase().includes(q)) }))
    .filter((group) => group.items.length > 0);
};

export { filterGroups };
