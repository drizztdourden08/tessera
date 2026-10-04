/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { SubMenuJoin } from './sub-menu-join.type';

interface SafeAreaRefs {
  rowRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  areaRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
}

interface SafeAreaOptions extends SafeAreaRefs {
  join: SubMenuJoin | null;
}

export type { SafeAreaOptions };
