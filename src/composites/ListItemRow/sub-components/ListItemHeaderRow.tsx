/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { headerCells } from '../behavior/header-cells';
import type { ListItemHeaderRowProps } from './ListItemHeaderRow.type';
import '../../../theme/row-inset.css';

const ListItemHeaderRow = ({ header, shape }: ListItemHeaderRowProps) => header && (
  <Box className="list-item-list__header row-inset" aria-hidden>
    {headerCells(header, shape).map((cell, index) => (
      <Box key={index} className={`list-item-list__head list-item-list__head--${cell.track} list-item-list__head--${cell.align}`}>
        <Span tone="muted" className="list-item-list__label">{cell.label}</Span>
      </Box>
    ))}
  </Box>
);

export { ListItemHeaderRow };
