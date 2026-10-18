/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { PaneFold } from '../../pane-edge/pane-fold.type';
import type { EdgeHandle } from '../../pane-edge/pane-edge.type';
import type { CollapsedSide, SplitOrientation } from '../SplitPane.type';

interface SplitPaneOptions {
  orientation: SplitOrientation;
  defaultRatio: number;
  defaultCollapsed: CollapsedSide;
  minRatio: number;
  maxRatio: number;
  collapsible: boolean;
}

interface SplitPaneParts {
  panesRef: RefObject<HTMLElement | null>;
  startFold: PaneFold;
  endFold: PaneFold;
  dragging: boolean;
  handle: EdgeHandle;
  template: string;
}

export type { SplitPaneOptions, SplitPaneParts };
