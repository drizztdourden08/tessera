/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CELL_ATTRIBUTE } from '../VirtualGrid.constants';
import type { GridCellProps } from './GridCell.type';
import '../../../theme/focus-ring.css';

const GridCell = (props: GridCellProps) => {
  const { index, column, tabbable, onActivate, onNavigate, children } = props;
  return (
    <Box
      role="gridcell"
      className="virtual-grid__cell focus-ring-inset"
      tabIndex={tabbable ? 0 : -1}
      aria-colindex={column + 1}
      {...{ [CELL_ATTRIBUTE]: index }}
      onFocus={() => onActivate(index)}
      onKeyDown={(event) => onNavigate(event, index)}
    >
      {children}
    </Box>
  );
};

export { GridCell };
