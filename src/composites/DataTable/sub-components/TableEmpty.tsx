/* @layer renderer-components @kind component */
import { EmptyState } from '../../../primitives/EmptyState';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { TableEmptyProps } from './TableEmpty.type';

const TableEmpty = ({ empty, message }: TableEmptyProps) => {
  const { common } = useTesseraStrings();
  if (!empty) return null;
  return <EmptyState className="data-table__empty" message={message ?? common.nothingToShow} />;
};

export { TableEmpty };
