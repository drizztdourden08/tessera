/* @layer renderer-components @kind logic */
import type { SideNavConfig, SideNavSearch } from '../SideNav.type';
import type { SideNavLeadRow } from './lead-row.type';

const leadRow = (config: SideNavConfig, search: SideNavSearch | undefined, open: boolean): SideNavLeadRow => {
  if (search !== undefined) return 'search';
  if (config.home !== undefined) return 'item';
  return open && config.groups[0]?.label ? 'label' : 'item';
};

export { leadRow };
