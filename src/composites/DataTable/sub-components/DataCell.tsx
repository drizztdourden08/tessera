/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { DragEvent } from 'react';
import type { DataCellProps } from './DataCell.type';

const DataCell = (props: DataCellProps) => {
  const { path, index, dragging, onDragOver, onDrop, children } = props;

  return (
    <Box
      className={dragging ? 'data-table__cell data-table__cell--dragging' : 'data-table__cell'}
      role="gridcell"
      data-column={path}
      onDragOver={onDragOver && ((event: DragEvent<HTMLElement>) => onDragOver(index, event))}
      onDrop={onDrop && ((event: DragEvent<HTMLElement>) => onDrop(index, event))}
    >
      {children}
    </Box>
  );
};

export { DataCell };
