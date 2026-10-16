/* @layer renderer-components @kind types */
import type { PaneFoldOptions } from '../../pane-fold/pane-fold.type';
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';

type ListDetailView = 'list' | 'detail' | 'both';

interface PaneScroll {
  list: boolean;
  detail: boolean;
}

interface LayoutOptions {
  width: PaneSizeOptions;
  ratio: boolean;
  collapse: PaneFoldOptions;
  detailCollapse: PaneFoldOptions;
  scroll: PaneScroll;
  view: ListDetailView;
  empty: boolean;
  resizable: boolean;
}

export type { LayoutOptions, ListDetailView };
