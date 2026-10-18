/* @layer renderer-components @kind logic */
import type { FoldSide, HandleFold } from '../ResizeHandle/ResizeHandle.type';
import { foldSidesOf } from './fold-sides-of';
import type { PaneFold } from './pane-fold.type';
import type { PaneEdgeOptions, PaneEdgeWiring } from './pane-edge.type';
import { SHARE_STEP, SHARE_STEP_LARGE } from './pane-edge.constants';
import { sharePixels } from './share-pixels';

const foldedSideOf = (fold: PaneFold, other: PaneFold | undefined): FoldSide | null => {
  if (fold.collapsed) return 'low';
  return other?.collapsed ? 'high' : null;
};

const paneEdgeOf = (options: PaneEdgeOptions): PaneEdgeWiring => {
  const { edge, size, fold, shares } = options;
  const other = options.other && { ...options.other, collapsed: options.other.collapsed && !fold.collapsed };
  const sides = foldSidesOf(fold, other);
  const paneOf = (side: FoldSide): PaneFold | undefined => (side === 'low' ? fold : other);
  const handleFold: HandleFold | undefined = sides.length === 0 ? undefined : {
    sides,
    folded: foldedSideOf(fold, other),
    onFold: (side) => paneOf(side)?.collapse?.(),
    onUnfold: (side, to) => {
      paneOf(side)?.expand?.();
      size.handle.onResize(to, { from: to, by: 'drag' });
    },
  };
  const measured = shares && {
    pixelsPerUnit: () => sharePixels(shares.panes.current, shares.orientation),
    step: SHARE_STEP,
    largeStep: SHARE_STEP_LARGE,
  };
  const onReset = () => {
    fold.expand?.();
    other?.expand?.();
    size.handle.onReset();
  };
  return { handle: { ...size.handle, ...measured, onReset, edge, fold: handleFold }, other };
};

export { paneEdgeOf };
