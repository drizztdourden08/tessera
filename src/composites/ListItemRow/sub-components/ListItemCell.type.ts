/* @layer renderer-components @kind types */
import type { ListItemColumn } from '../ListItemRow.type';

interface ListItemCellProps extends ListItemColumn {
  main?: boolean;
}

export type { ListItemCellProps };
