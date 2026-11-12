/* @layer renderer-components @kind component */
import type { TableRowProps } from '../Table.type';

const TableRow = (props: TableRowProps) => {
  const { tone, className, children, ...rest } = props;
  const classes = ['table__row', tone && `table__row--${tone}`, className].filter(Boolean).join(' ');
  return <tr className={classes} {...rest}>{children}</tr>;
};

export { TableRow };
