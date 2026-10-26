/* @layer renderer-components @kind component */
import { Box } from '../Box';
import type { TableProps } from './Table.type';
import './Table.css';

const Table = (props: TableProps) => {
  const { striped = false, className, children, ...rest } = props;
  return (
    <Box className={className ? `table-wrap ${className}` : 'table-wrap'}>
      <table className={striped ? 'table table--striped' : 'table'} {...rest}>{children}</table>
    </Box>
  );
};

export { Table };
