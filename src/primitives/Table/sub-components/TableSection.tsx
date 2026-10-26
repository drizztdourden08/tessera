/* @layer renderer-components @kind component */
import type { TableSectionProps } from '../Table.type';

const TableSection = (props: TableSectionProps) => {
  const { head = false, className, children, ...rest } = props;
  const classes = [head ? 'table__head' : 'table__body', className].filter(Boolean).join(' ');
  return head ? <thead className={classes} {...rest}>{children}</thead> : <tbody className={classes} {...rest}>{children}</tbody>;
};

export { TableSection };
