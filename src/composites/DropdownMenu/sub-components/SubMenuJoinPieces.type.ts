/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { SubMenuJoin } from '../behavior/sub-menu-join.type';

interface SubMenuJoinPiecesProps {
  join: SubMenuJoin | null;
  areaRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
}

export type { SubMenuJoinPiecesProps };
