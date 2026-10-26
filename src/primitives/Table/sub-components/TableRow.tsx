/* @layer renderer-components @kind component */
import type { TableRowProps } from '../Table.type';

const TableRow = (props: TableRowProps) => {
  const { className, children, ...rest } = props;
  return <tr className={className ? `table__row ${className}` : 'table__row'} {...rest}>{children}</tr>;
};

export { TableRow };
