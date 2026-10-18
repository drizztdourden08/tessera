/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { columnsOf } from '../../pane-edge/columns-of';
import { foldedPaneOf } from '../../pane-edge/folded-pane-of';
import { paneEdgeOf } from '../../pane-edge/pane-edge-of';
import type { PaneFoldOptions } from '../../pane-edge/pane-fold.type';
import { usePaneFold } from '../../pane-edge/usePaneFold';
import { usePaneSize } from '../../ResizeHandle/behavior/usePaneSize';
import type { CollapsedSide } from '../SplitPane.type';
import { PERCENT } from './useSplitPane.constants';
import type { SplitPaneOptions, SplitPaneParts } from './useSplitPane.type';

const foldOf = (options: SplitPaneOptions, side: CollapsedSide): PaneFoldOptions => ({
  collapsible: options.collapsible,
  collapsed: undefined,
  defaultCollapsed: options.defaultCollapsed === side,
  onCollapsedChange: undefined,
  storageKey: undefined,
});

const useSplitPane = (options: SplitPaneOptions): SplitPaneParts => {
  const { orientation, defaultRatio, minRatio, maxRatio } = options;
  const panesRef = useRef<HTMLElement>(null);
  const startFold = usePaneFold(foldOf(options, 'start'));
  const ownEndFold = usePaneFold(foldOf(options, 'end'));
  const size = usePaneSize({ initial: defaultRatio * PERCENT, min: minRatio * PERCENT, max: maxRatio * PERCENT, fine: true });
  const { handle, other } = paneEdgeOf({ edge: 'start', size, fold: startFold, other: ownEndFold, shares: { panes: panesRef, orientation } });
  const endFold = other ?? ownEndFold;
  const folded = foldedPaneOf(startFold, endFold);
  return { panesRef, startFold, endFold, dragging: size.dragging, handle, template: columnsOf({ size: size.size, shares: true, folded }) };
};

export { useSplitPane };
