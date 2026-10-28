/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rowAttrs } from '../behavior/row-attrs';
import { hideStep } from '../behavior/hide-step';
import type { TrackRowProps } from '../TrackTable.type';

const TrackRow = <Row,>({ row, index, columns, onRowClick, tone, open }: TrackRowProps<Row>) => (
  <Box className="track-table__row" role="row" {...rowAttrs({ row, onRowClick, tone, open })}>
    {columns.map((column) => (
      <Box key={column.id} className="track-table__cell" role="cell" data-align={column.align} data-drop={column.drop} data-hide={hideStep(column)}>
        {column.cell(row, index)}
      </Box>
    ))}
  </Box>
);

export { TrackRow };
