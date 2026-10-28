/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { hideStep } from '../behavior/hide-step';
import type { TrackHeadProps } from '../TrackTable.type';

const TrackHead = <Row,>({ columns }: TrackHeadProps<Row>) => (
  <Box className="track-table__row track-table__head" role="row">
    {columns.map((column) => (
      <Box
        key={column.id}
        className="track-table__cell"
        role="columnheader"
        data-align={column.align}
        data-drop={column.drop}
        data-hide={hideStep(column)}
      >
        {column.label}
      </Box>
    ))}
  </Box>
);

export { TrackHead };
