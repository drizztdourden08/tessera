/* @layer renderer-components @kind types */
import type { SideNavVariant } from '../SideNav.type';
import type { SideNavLeadRow } from './lead-row.type';

interface NavClassParams {
  variant: SideNavVariant;
  open: boolean;
  overlay: boolean;
  lead: SideNavLeadRow;
  className: string;
}

export type { NavClassParams };
