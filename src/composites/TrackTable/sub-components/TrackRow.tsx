/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { TrackRowProps } from '../TrackTable.type';

const TrackRow = <Row,>({ row, index, columns }: TrackRowProps<Row>) => (
  <Box className="track-table__row" role="row">
    {columns.map((column) => (
      <Box key={column.id} className="track-table__cell" role="cell" data-align={column.align} data-drop={column.drop}>
        {column.cell(row, index)}
      </Box>
    ))}
  </Box>
);

export { TrackRow };
