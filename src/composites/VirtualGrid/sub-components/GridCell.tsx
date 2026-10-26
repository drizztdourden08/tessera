/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { GridCellProps } from './GridCell.type';
import '../../../theme/focus-ring.css';

const GridCell = (props: GridCellProps) => {
  const { bind, children } = props;
  return <Box {...bind}>{children}</Box>;
};

export { GridCell };
