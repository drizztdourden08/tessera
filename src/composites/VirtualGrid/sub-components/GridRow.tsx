/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { HEADS_PROPERTY, ROW_ATTRIBUTE, ROW_PROPERTY } from '../VirtualGrid.constants';
import type { CSSProperties } from 'react';
import type { GridRowProps } from './GridRow.type';

const GridRow = (props: GridRowProps) => {
  const { at, row, children } = props;
  const placed = { [ROW_PROPERTY]: row.tiles, [HEADS_PROPERTY]: row.heads } as CSSProperties;
  return (
    <Box role="row" className={`virtual-grid__row virtual-grid__row--${row.kind}`} style={placed} aria-rowindex={at + 1} {...{ [ROW_ATTRIBUTE]: at }}>
      {children}
    </Box>
  );
};

export { GridRow };
