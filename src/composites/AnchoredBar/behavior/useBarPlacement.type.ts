/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { AnchoredBarProps, BarDock, BarPlacement } from '../AnchoredBar.type';

interface BarPlacementSetup {
  nodeRef: RefObject<HTMLElement | null>;
  anchorRect: AnchoredBarProps['anchorRect'];
  boundary?: AnchoredBarProps['boundary'];
  subscribe?: AnchoredBarProps['subscribe'];
  inline: boolean;
  placement: BarPlacement;
  dock: BarDock;
  follow: boolean;
}

export type { BarPlacementSetup };
