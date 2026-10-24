/* @layer renderer-components @kind logic */
import type { PaneFoldOptions } from '../../pane-edge/pane-fold.type';
import type { PairedFolds } from './is-paired.type';

const isPaired = (list: PaneFoldOptions, detail: PaneFoldOptions, folds: PairedFolds): boolean => (
  list.collapsible && detail.collapsible && !folds.list.collapsed && !folds.detail.collapsed
);

export { isPaired };
