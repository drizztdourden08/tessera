/* @layer renderer-components @kind types */
import type { PaneSizeOptions } from '../../ResizeHandle/behavior/pane-size.type';

type ListDetailView = 'list' | 'detail' | 'both';

interface PaneFoldOptions {
  collapsible: boolean;
  collapsed: boolean | undefined;
  defaultCollapsed: boolean;
  onCollapsedChange: ((collapsed: boolean) => void) | undefined;
  storageKey: string | undefined;
}

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

export type { LayoutOptions, ListDetailView, PaneFoldOptions };
