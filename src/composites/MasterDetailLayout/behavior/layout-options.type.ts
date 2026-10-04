/* @layer renderer-components @kind types */
import type { ListWidthOptions } from './list-width.type';

type MasterDetailView = 'list' | 'detail' | 'both';

interface LayoutOptions {
  width: ListWidthOptions;
  view: MasterDetailView;
  resizable: boolean;
}

export type { LayoutOptions, MasterDetailView };
