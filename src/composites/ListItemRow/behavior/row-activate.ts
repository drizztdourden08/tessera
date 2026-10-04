/* @layer renderer-components @kind logic */
import type { ListItemRowProps } from '../ListItemRow.type';

const rowActivate = (props: Pick<ListItemRowProps, 'onClick' | 'onDoubleClick'>, detail: number): void => {
  if (props.onClick) props.onClick();
  else if (detail === 0) props.onDoubleClick?.();
};

export { rowActivate };
