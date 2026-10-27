/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import type { SeatGridProps } from './SeatGrid.type';
import './SeatGrid.css';

const SeatGrid = ({ children, label, minWidth = 'md', gap = 'md', className }: SeatGridProps) => (
  <Box
    role="group"
    aria-label={label}
    className={className ? `seat-grid ${className}` : 'seat-grid'}
    data-min={minWidth}
    data-gap={gap}
  >
    {children}
  </Box>
);

export { SeatGrid };
