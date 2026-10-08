/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import type { GridCellProps } from './DashboardGrid.type';

const GridCell = ({ span = 1, children }: GridCellProps) => (
  <Box className="dense-grid__cell" data-span={span}>{children}</Box>
);

export { GridCell };
