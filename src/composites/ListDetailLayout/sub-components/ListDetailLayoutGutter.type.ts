/* @layer renderer-components @kind types */
import type { PaneSizeHandle } from '../../ResizeHandle/behavior/pane-size.type';
import type { ListCollapse } from '../behavior/useListCollapse.type';

interface ListDetailLayoutGutterProps {
  collapse: ListCollapse;
  collapsible: boolean;
  resizable: boolean;
  listId: string;
  listLabel: string;
  detailLabel: string;
  handle: PaneSizeHandle;
}

export type { ListDetailLayoutGutterProps };
