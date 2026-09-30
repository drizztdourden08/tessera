/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { cellContent } from '../behavior/cell-content';
import type { ColumnDragGhostProps } from './ColumnDragGhost.type';

const ColumnDragGhost = forwardRef<HTMLElement, ColumnDragGhostProps>((props, ref) => {
  const { label, path, field, rows, total } = props;
  const rest = Math.max(0, total - rows.length);

  return (
    <Box ref={ref} className="data-table__drag-ghost" aria-hidden="true">
      <Box className="data-table__drag-ghost-head">
        <Icon name="grip-vertical" size={14} className="data-table__drag-ghost-grip" />
        <Text variant="label" className="data-table__drag-ghost-label">{label}</Text>
      </Box>
      {rows.map((row, index) => (
        <Box key={`${path}#${index}`} className="data-table__drag-ghost-cell">
          {cellContent(row, path, field)}
        </Box>
      ))}
      {rest > 0 && <Text variant="caption" className="data-table__drag-ghost-rest">{`+${rest} more`}</Text>}
    </Box>
  );
});

export { ColumnDragGhost };
