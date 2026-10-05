/* @layer renderer-components @kind types */
import type { ListWidthOptions } from './list-width.type';

type ListDetailView = 'list' | 'detail' | 'both';

interface ListCollapseOptions {
  collapsible: boolean;
  collapsed: boolean | undefined;
  defaultCollapsed: boolean;
  onCollapsedChange: ((collapsed: boolean) => void) | undefined;
  storageKey: string | undefined;
}

interface LayoutOptions {
  width: ListWidthOptions;
  collapse: ListCollapseOptions;
  view: ListDetailView;
  empty: boolean;
  resizable: boolean;
}

export type { LayoutOptions, ListCollapseOptions, ListDetailView };
