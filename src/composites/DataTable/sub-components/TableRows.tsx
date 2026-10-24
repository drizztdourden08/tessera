/* @layer renderer-components @kind component */
import { RowTree } from './RowTree';
import { VirtualRows } from './VirtualRows';
import type { TableRowsProps } from './TableRows.type';

const TableRows = <T,>(props: TableRowsProps<T>) => {
  const { virtual, nodes, context } = props;
  if (virtual) return <VirtualRows virtual={virtual} context={context} />;
  return <RowTree nodes={nodes} parentUid="" context={context} />;
};

export { TableRows };
