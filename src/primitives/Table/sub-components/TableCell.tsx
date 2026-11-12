/* @layer renderer-components @kind component */
import type { TableCellProps } from '../Table.type';

const TableCell = (props: TableCellProps) => {
  const { header = false, align, width, className, children, ...rest } = props;
  const classes = ['table__cell', header && 'table__cell--head', align && `table__cell--${align}`, width && `table__cell--w-${width}`, className].filter(Boolean).join(' ');
  return header ? <th className={classes} {...rest}>{children}</th> : <td className={classes} {...rest}>{children}</td>;
};

export { TableCell };
