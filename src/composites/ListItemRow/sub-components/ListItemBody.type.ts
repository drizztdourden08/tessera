/* @layer renderer-components @kind types */
import type { ListItemRowProps } from '../ListItemRow.type';

type ListItemBodyProps = Pick<ListItemRowProps, 'name' | 'meta' | 'icon' | 'columns'>;

export type { ListItemBodyProps };
