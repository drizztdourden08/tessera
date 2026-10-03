/* @layer renderer-components @kind types */
import type { SubMenuJoin } from './sub-menu-join.type';

interface SubMenuJoinState {
  join: SubMenuJoin | null;
  native: boolean;
}

export type { SubMenuJoinState };
