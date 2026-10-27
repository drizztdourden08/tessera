/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { TrackDetailProps } from '../TrackTable.type';

const TrackDetail = ({ children }: TrackDetailProps) => (
  <Box className="track-table__detail" role="row">
    <Box className="track-table__detail-cell" role="cell">{children}</Box>
  </Box>
);

export { TrackDetail };
