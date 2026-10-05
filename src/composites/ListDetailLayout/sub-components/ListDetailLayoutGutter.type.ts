/* @layer renderer-components @kind types */
import type { SplitDividerProps } from '../../SplitPane/sub-components/SplitDivider.type';
import type { ListCollapse } from '../behavior/useListCollapse.type';

interface ListDetailLayoutGutterProps {
  collapse: ListCollapse;
  collapsible: boolean;
  resizable: boolean;
  listId: string;
  listLabel: string;
  detailLabel: string;
  width: number;
  range: { min: number; max: number };
  handlers: SplitDividerProps['handlers'];
}

export type { ListDetailLayoutGutterProps };
