/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ROW_ATTRIBUTE, ROW_PROPERTY } from '../VirtualGrid.constants';
import type { CSSProperties } from 'react';
import type { GridRowProps } from './GridRow.type';

const GridRow = (props: GridRowProps) => {
  const { row, children } = props;
  const placed = { [ROW_PROPERTY]: row } as CSSProperties;
  return (
    <Box role="row" className="virtual-grid__row" style={placed} aria-rowindex={row + 1} {...{ [ROW_ATTRIBUTE]: row }}>
      {children}
    </Box>
  );
};

export { GridRow };
