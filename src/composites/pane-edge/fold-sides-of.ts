/* @layer renderer-components @kind logic */
import type { FoldSide } from '../ResizeHandle/ResizeHandle.type';
import type { PaneFold } from './pane-fold.type';

const foldSidesOf = (fold: PaneFold, other: PaneFold | undefined): readonly FoldSide[] => {
  const sides: FoldSide[] = [];
  if (fold.collapse) sides.push('low');
  if (other?.collapse) sides.push('high');
  return sides;
};

export { foldSidesOf };
