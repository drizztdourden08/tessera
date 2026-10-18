/* @layer renderer-components @kind logic */
import type { FoldedPane } from './columns-of.type';
import type { PaneFold } from './pane-fold.type';

const foldedPaneOf = (start: PaneFold, end: PaneFold): FoldedPane => {
  if (start.collapsed) return 'start';
  return end.collapsed ? 'end' : null;
};

export { foldedPaneOf };
